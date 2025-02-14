import GoogleIcon from "@/components/icons/GoogleIcon";
import Link from "next/link";

export default function GoogleOAuthBtn() {
  const URL = `https://accounts.google.com/o/oauth2/auth?redirect_uri=http://localhost:3000/auth/session/callback&response_type=token&client_id=${process.env.GOOGLE_CLIENT_ID}&scope=openid%20email%20profile`;
  return (
    <button className="hover:bg-muted w-full cursor-pointer rounded-full border font-semibold duration-100">
      <Link href={URL} className="flex items-center justify-center p-1">
        <GoogleIcon className="size-8" />
        <span>Google</span>
      </Link>
    </button>
  );
}
