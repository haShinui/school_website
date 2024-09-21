'use client'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiService from '../services/apiService';  // Import your API service
import { checkAuthentication } from '../store/actions';  // Import the authentication check action
import { AppDispatch } from '../store';  // Import the AppDispatch type
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WindowsLogo, User, UsersThree, Info, House } from "phosphor-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';  // For i18n translations

export function LoginPageComponent() {
  const { t } = useTranslation();  // Initialize translations
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();  // Set up the dispatch with proper types

  // Handle username and password login
  const secureAllauthLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const loginData = { username, password };
      const response = await apiService.secureAllauthLogin(loginData);
      
      if (response.data.success) {
        dispatch(checkAuthentication());  // Check and update the authentication state
        navigate('/');  // Redirect to the homepage on success
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      setLoginError(t('login_failed'));
      console.error('Error during login:', error);
    }
  };

  // Handle Microsoft login
  const initiateMicrosoftLogin = async () => {
    try {
      const response = await apiService.secureMicrosoftLogin();
      
      if (response.data.login_url) {
        window.location.href = response.data.login_url;  // Redirect to Microsoft login
      } else {
        console.error('Microsoft login URL not found.');
      }
    } catch (error) {
      console.error('Error initiating Microsoft login:', error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 relative">
      
      {/* Home button */}
      <Link 
        to="/" 
        className="absolute top-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center space-x-2"
      >
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <House size={24} />
          <span>{t('home')}</span> {/* Translated Home button text */}
        </Button>
      </Link>

      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('login')}</CardTitle>  {/* Translated title */}
          <CardDescription>{t('choose_login_method')}</CardDescription>  {/* Translated description */}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="microsoft" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-9">
              <TabsTrigger value="microsoft" className="text-xs">{t('microsoft_login')}</TabsTrigger>  {/* Translated Microsoft login tab */}
              <TabsTrigger value="other" className="text-xs">{t('guest_login')}</TabsTrigger>  {/* Translated Guest login tab */}
            </TabsList>

            {/* Microsoft login */}
            <TabsContent value="microsoft" className="mt-4">
              <div className="space-y-4">
                <Button className="w-full" variant="outline" onClick={initiateMicrosoftLogin}> {/* Microsoft login handler */}
                  <WindowsLogo size={20} className="mr-2" />
                  {t('login_with_microsoft')}  {/* Translated Microsoft login button */}
                </Button>
                <p className="text-sm text-muted-foreground">
                  <strong>{t('note')}:</strong> {t('microsoft_login_note')}  {/* Translated Microsoft login note */}
                </p>
              </div>
            </TabsContent>

            {/* Guest/Admin login with username and password */}
            <TabsContent value="other" className="mt-4">
              <form className="space-y-4" onSubmit={secureAllauthLogin}>  {/* Form submission handler */}
                <div className="space-y-2">
                  <Label htmlFor="username">{t('email')}</Label>  {/* Translated label */}
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder={t('enter_email')} 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}  // Update username
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>  {/* Translated label */}
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder={t('enter_password')} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  // Update password
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">{t('login')}</Button>  {/* Submit button */}
              </form>

              {/* Error message */}
              {loginError && (
                <p className="text-sm text-red-600 mt-2">{t('login_failed')}: {loginError}</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Separator */}
        <hr className="mb-4 border-gray-300 dark:border-gray-700" />  {/* Reduced the gap above the separator */}

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h2 className="font-bold flex items-center gap-2">
              <Info size={22} />
              {t('important_information')}  {/* Translated information section */}
            </h2>
            <div className="pl-4 space-y-4">  {/* Added padding to indent */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('students')}  {/* Translated Students section */}
                </h3>
                <p className="text-sm text-muted-foreground pl-4">  {/* Indented small text */}
                  {t('students_info')}  {/* Translated student information */}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <UsersThree className="h-4 w-4" />
                  {t('parents_guests')}  {/* Translated Parents and Guests section */}
                </h3>
                <p className="text-sm text-muted-foreground pl-4">  {/* Indented small text */}
                  {t('parents_guests_info')}  {/* Translated Parents and Guests information */}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
