import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios, { AxiosRequestConfig } from 'axios';
import { Loader } from 'lucide-react';
import React from 'react'
import { ILoginResponse } from './types';

const Login = () => {
  const [login, setLogin] = React.useState<{ username: string; password: string; }>({ username: "", password: "" });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setLogin({ ...login, [name]: value });
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    sessionStorage.setItem("username", login.username);
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
    return;
    if (error) setError(null);

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "auth/login",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        email: login.username,
        password: login.password
      }
    }

    try {
      const res = await axios.request(config);
      const data: ILoginResponse = res.data;
      if (res.status === 400 || !data.success) {
        setError("Incorrect username or password");
        return;
      }
      localStorage.setItem("user", data.data.email);
      localStorage.setItem("nexus", data.data.token);
      localStorage.setItem("exp", data.data.exp);
      window.location.replace("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 400) setError("Incorrect username or password");
        if (err.status === 500 || err.status === 503) setError("An error occurred on the server");
      }
      setError("Unable to process request at this time");
      setLoading(false);
    }
  }

  return (
    <div className='h-[100dvh] grid place-items-center'>
      <div className="p-4">
        <Card className='w-full sm:min-w-[400px] min-w-0 max-w-[400px] shadow-lg'>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Please enter username and password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor="email">Username</Label>
                <Input placeholder='Enter username' name="username" required value={login.username} onChange={handleChange} />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor="email">Password</Label>
                <Input placeholder='Enter password' type="password" name="password" required value={login.password} onChange={handleChange} />
              </div>
              {error && <p className='text-red-500 text-sm'>{error.toString()}</p>}
              <div>
                <Button className='w-full' disabled={loading}>
                  {loading ? <Loader className='animate-spin w-4 h-4' /> : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login;
