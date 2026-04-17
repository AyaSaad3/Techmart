import apiServices from "@/services/api";
import InnerProfile from "./innerProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Profile() {

  const session = await getServerSession(authOptions)
  const token = session?.user?.token

  const address = await apiServices.getUserAdreesses(token ?? "")

  return (
    <InnerProfile address={address} />
  )
}
