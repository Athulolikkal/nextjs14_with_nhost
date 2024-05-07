import { NhostClient, useFileUpload } from "@nhost/nextjs";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
  adminSecret: process.env.NEXT_PUBLIC_NHOST_ADMIN_SECRET,
});

export default nhost;
