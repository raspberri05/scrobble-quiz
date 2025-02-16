import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music2Icon } from "lucide-react";
import { redirect } from "next/navigation";

export default function Page() {
  async function submitUsername(formData: FormData) {
    "use server";
    const username = formData.get("username") as string;
    redirect(`/quiz?username=${username}&period=7day`);
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center">
            <Music2Icon />
          </div>
          <CardTitle className="text-2xl text-center ">Scrobble Quiz</CardTitle>
          <CardDescription className="text-center ">
            Test your music knowledge based on your Last.fm history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Enter your Last.fm username"
              />
            </div>
            <Button
              formAction={submitUsername}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600"
            >
              Take your quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
