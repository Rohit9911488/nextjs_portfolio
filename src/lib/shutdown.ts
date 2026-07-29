import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "./db/cache";
import { getSettingByKey } from "./db/settings";
import { prisma } from "./db/prisma";
import { SHUTDOWN_SETTING_KEY } from "./shutdown-constants";

export async function getShutdownEnabled(): Promise<boolean> {
  return getSettingByKey(SHUTDOWN_SETTING_KEY, false);
}

export async function setShutdownEnabled(enabled: boolean): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key: SHUTDOWN_SETTING_KEY },
    update: { value: JSON.stringify(enabled) },
    create: { key: SHUTDOWN_SETTING_KEY, value: JSON.stringify(enabled) },
  });

  revalidateTag(CACHE_TAGS.settings, "max");
}
