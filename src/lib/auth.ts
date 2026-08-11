export function isAdminAuthorized(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  return authorization === `Bearer ${secret}`;
}
