import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // React Router for navigation
import { House, Info, UserCircle, Gear, SignOut, List, Table, SignIn  } from "phosphor-react"; // Phosphor icons
import { useTheme } from "@/components/theme-provider"; // Assuming you have your theme provider set up
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Redux dispatch
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import ArrowButton from "./animata/button/swipe-login";
import apiMethods from '../services/apiService'; // Use your apiService here
import { useTranslation } from "react-i18next";

// Auth Status type
type AuthStatus = {
  isAuthenticated: boolean;
  role: string | null;
};

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false); // Initialize isOpen to control mobile menu
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    role: null,
  }); // State for authentication status
  const location = useLocation();
  const navigate = useNavigate(); // React Router navigate
  const dispatch = useDispatch(); // Redux dispatch
  const { t } = useTranslation(); // Use translation function
  const { theme } = useTheme(); // Fetch current theme to handle light/dark mode

  // Fetch authentication status when the component mounts
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const result = await apiMethods.checkAuth(); // Check if the user is authenticated
        setAuthStatus({
          isAuthenticated: result.isAuthenticated,
          role: result.role,
        });
      } catch (error) {
        console.error("Failed to fetch authentication status", error);
      }
    };

    fetchAuthStatus();
  }, []); // Fetch auth status when component mounts

  // Handle logout using the apiService logout function
  const handleLogout = async () => {
    try {
      const response = await apiMethods.logout(); // Call your logout API
      if (response.data.success) {
        // Successfully logged out
        console.log("Logged out successfully.");

        // Clear local and session storage
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");

        // Update the authentication status to reflect logout
        setAuthStatus({
          isAuthenticated: false,
          role: null,
        });

        // Redirect to login page or home
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between p-4 w-full mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Logo</span>
        </Link>

        {/* Centered Navigation Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`flex items-center text-base font-medium transition-colors hover:text-primary ${
                location.pathname === "/"
                  ? `${theme === "light" ? "text-black font-bold" : "text-primary font-bold"}`
                  : "text-muted-foreground"
              }`}
            >
              <House className="h-4 w-4 mr-2" />
              {t("home")} {/* Home in English or German */}
            </Link>

            <Link
              to="/about"
              className={`flex items-center text-base font-medium transition-colors hover:text-primary ${
                location.pathname === "/about"
                  ? `${theme === "light" ? "text-black font-bold" : "text-primary font-bold"}`
                  : "text-muted-foreground"
              }`}
            >
              <Info className="h-4 w-4 mr-2" />
              {t("about")} {/* About in English or German */}
            </Link>

            {/* Conditionally render Manager Dashboard */}
            {authStatus.isAuthenticated && authStatus.role === "manager" && (
              <Link
                to="/manager-dashboard"
                className={`flex items-center text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === "/manager-dashboard"
                    ? `${theme === "light" ? "text-black font-bold" : "text-primary font-bold"}`
                    : "text-muted-foreground"
                }`}
              >
                <Table className="h-4 w-4 mr-2" />
                {t("dashboard")} {/* Dashboard in English or German */}
              </Link>
            )}
            {authStatus.isAuthenticated && authStatus.role === "normal" && (
              <Link
                to="/signup-course"
                className={`flex items-center text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === "/signup-course"
                    ? `${theme === "light" ? "text-black font-bold" : "text-primary font-bold"}`
                    : "text-muted-foreground"
                }`}
              >
                <SignIn className="h-4 w-4 mr-2" />
                {t("Sign Up for Course")} {/* Sign up link */}
              </Link>
            )}
          </div>
        </div>

        {/* Theme Toggle and Auth Button/Profile */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Navigation Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <List className="h-6 w-6" />
                <span className="sr-only">{t("toggle_menu")}</span> {/* Toggle menu */}
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  to="/"
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === "/"
                      ? `${theme === "light" ? "text-black font-bold" : "text-primary font-bold"}`
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t("home")}
                </Link>
                <Link
                  to="/about"
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === "/about"
                      ? `${theme === "light" ? "text-black font-bold" : "text-primary font-bold"}`
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t("about")}
                </Link>
                {/* Mobile View: Conditionally render Manager Dashboard */}
                {authStatus.isAuthenticated && authStatus.role === "manager" && (
                  <Link
                    to="/manager-dashboard"
                    className={`text-base font-medium transition-colors hover:text-primary ${
                      location.pathname === "/manager-dashboard"
                        ? `${theme === "light" ? "text-black font-bold" : "text-primary font-bold"}`
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("dashboard")}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Auth Button or Profile */}
          {authStatus.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                  {/* Larger UserCircle icon with custom color */}
                  <UserCircle size={42} weight="light" className="text-primary dark:text-white" /> {/* Increased size and color control */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Gear size={22} weight="light" className="mr-2" />
                  <span>{t("settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <SignOut size={22} weight="light" className="mr-2" />
                  <span>{t("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <ArrowButton />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
