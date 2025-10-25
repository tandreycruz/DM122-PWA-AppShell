export async function mockProfileAPI() {
  console.log(`👁️ [mock-api.js] generating a json from service worker`);

  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Carlos Rivera",
    "Dana Lee",
    "Eve Thompson",
    "Frank Martin",
    "Grace Kim",
    "Hugo Alvarez",
    "Ivy Chen",
    "Jack O'Neil",
  ];

  const name = names[Math.floor(Math.random() * names.length)];
  const email =
    name
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .trim()
      .replace(/\s+/g, ".") + "@example.com";

  // Use pravatar for a simple profile picture placeholder
  const avatarId = Math.floor(Math.random() * 70) + 1; // pravatar supports many ids
  const profilePicture = `https://i.pravatar.cc/150?img=${avatarId}`;

  const body = {
    name,
    email,
    profilePicture,
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}