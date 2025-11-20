import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/redux/slice/auth.slice";

const SuperAdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <div className="flex w-full justify-center items-center flex-1 p-6">
      <Card className="w-[600px]">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Super Admin Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Welcome, Super Administrator!
            </h2>
            <p className="text-slate-600">
              You have full access to all system features and settings.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
              <p className="text-2xl font-bold text-foreground">100%</p>
              <p className="text-sm text-muted-foreground">System Access</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
              <p className="text-2xl font-bold text-foreground">Admin</p>
              <p className="text-sm text-muted-foreground">Role Level</p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full mt-4"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminPage;
