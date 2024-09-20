import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import  apiService  from "@/services/apiService"; // Adjust the path as needed

export default function SignupCoursePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.signupCourse();
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError("Failed to sign up for the course.");
      }
    } catch (e) {
      setError("An error occurred during sign-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Course Title</CardTitle>
          <CardDescription>
            A short description of what the course is about. This course covers the basics of X, Y, and Z and will
            take approximately 4 weeks to complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              Course Duration: <strong>4 weeks</strong>
            </p>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">Successfully signed up for the course!</p>}

          <Button onClick={handleSignup} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up for Course"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
