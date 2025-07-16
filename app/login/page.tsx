import Login from "@/components/Login";
import SessionWrapper from "@/components/SessionWrapper";
export default function LoginPage(){
  return (
    <SessionWrapper>
      <Login />
    </SessionWrapper>
  )
}