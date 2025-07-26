import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';


import { useNavigate } from 'react-router-dom';







const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ email, password })).unwrap();

      localStorage.setItem('token', result.token);
      localStorage.setItem('role', result.role);

      if (result.role === 'farmer') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/user/dashboard');
      }

      // Optional: clear form after successful login
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Login failed:', err.message);
      alert(err.message || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-24 bg-white p-8 rounded shadow-md"
      autoComplete="off"
    >
      <div className="flex justify-center mb-6">
        <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
          L
        </div>
      </div>

      <h2 className="text-center text-2xl font-semibold mb-6">Please sign in</h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="new-email"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" />
        <label className="text-sm text-gray-700">Remember me</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Sign in'}
      </button>

      <p className="text-center text-xs text-gray-400 mt-6">© 2017–2025</p>
    </form>
  );
};

export default Login;















// import { useState } from 'react';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { Label } from '../../components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
// import { Checkbox } from '../../components/ui/checkbox';
// import { Alert, AlertDescription } from '../../components/ui/alert';
// import { Loader2 } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Simulate API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock authentication logic
//       if (email === 'test@example.com' && password === 'password') {
//         console.log('Login successful');
//         // Handle successful login here
//       } else {
//         setError('Invalid email or password');
//       }
//       } catch {
//     // } catch (err) {
//       setError('Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <div className="w-full max-w-md space-y-6">
//         {/* Logo/Brand */}
//         <div className="flex justify-center">
//           <div className="w-16 h-16 bg-auth-gradient rounded-full flex items-center justify-center shadow-auth-glow">
//             <span className="text-2xl font-bold text-primary-foreground">L</span>
//           </div>
//         </div>

//         {/* Login Card */}
//         <Card className="shadow-auth border-0">
//           <CardHeader className="space-y-1 text-center">
//             <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
//             <CardDescription>
//               Enter your credentials to access your account
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email address</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="transition-all duration-200 focus:shadow-auth-glow"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="transition-all duration-200 focus:shadow-auth-glow"
//                 />
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="remember"
//                   checked={rememberMe}
//                   onCheckedChange={(checked) => setRememberMe(checked)}
//                 />
//                 <Label htmlFor="remember" className="text-sm font-normal">
//                   Remember me
//                 </Label>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full"
//                 variant="auth"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign in'
//                 )}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Don't have an account?{' '}
//                 <a href="#" className="text-primary hover:underline font-medium">
//                   Sign up here
//                 </a>
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Footer */}
//         <div className="text-center">
//           <p className="text-xs text-muted-foreground">
//             © 2017–2025 Your Company
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


















// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/slices/authSlice';


// import { useNavigate } from 'react-router-dom';







// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const result = await dispatch(login({ email, password })).unwrap();

//       localStorage.setItem('token', result.token);
//       localStorage.setItem('role', result.role);

//       if (result.role === 'farmer') {
//         navigate('/farmer/dashboard');
//       } else {
//         navigate('/user/dashboard');
//       }

//       // Optional: clear form after successful login
//       setEmail('');
//       setPassword('');
//     } catch (err) {
//       console.error('Login failed:', err.message);
//       alert(err.message || 'Login failed');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-sm mx-auto mt-24 bg-white p-8 rounded shadow-md"
//       autoComplete="off"
//     >
//       <div className="flex justify-center mb-6">
//         <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
//           L
//         </div>
//       </div>

//       <h2 className="text-center text-2xl font-semibold mb-6">Please sign in</h2>

//       {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//       <div className="mb-4">
//         <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
//         <input
//           type="email"
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//           placeholder="Email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           autoComplete="new-email"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//         <input
//           type="password"
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           autoComplete="new-password"
//         />
//       </div>

//       <div className="flex items-center mb-4">
//         <input type="checkbox" className="mr-2" />
//         <label className="text-sm text-gray-700">Remember me</label>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? 'Logging in...' : 'Sign in'}
//       </button>

//       <p className="text-center text-xs text-gray-400 mt-6">© 2017–2025</p>
//     </form>
//   );
// };

// export default Login;



















// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             await authService.login({ email, password });
//             clearForm();
//             navigate('/'); // Redirect to home/dashboard
//         } catch (err) {
//             setError(err.message || 'Login failed');
//         } finally {
//             setLoading(false);
//         }
//     };


//     const clearForm = () => {
//         setEmail('');
//         setPassword('');
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-sm mx-auto mt-24 bg-white p-8 rounded shadow-md"
//             autoComplete="off"
//         >

//             <div className="flex justify-center mb-6">

//                 <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
//                     L
//                 </div>
//             </div>

//             <h2 className="text-center text-2xl font-semibold mb-6">Please sign in</h2>

//             {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//             <div className="mb-4">
//                 <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
//                 <input
//                     type="email"
//                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     autoComplete="new-email"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//                 <input
//                     type="password"
//                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     autoComplete="new-password"
//                 />
//             </div>

//             <div className="flex items-center mb-4">
//                 <input type="checkbox" className="mr-2" />
//                 <label className="text-sm text-gray-700">Remember me</label>
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
//                 disabled={loading}
//             >
//                 {loading ? 'Logging in...' : 'Sign in'}
//             </button>

//             <p className="text-center text-xs text-gray-400 mt-6">© 2017–2025</p>
//         </form>

//     );
// };

// export default Login;



// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { loading, error } = useSelector((state) => state.auth);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const result = await dispatch(login({ email, password }));
//             if (result.meta.requestStatus === 'fulfilled') {
//                 clearForm();
//                 // Redirect to home or dashboard after successful login
//                 navigate('/');
//             }
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     // clear form fields after submission
//     const clearForm = () => {
//         setEmail('');
//         setPassword('');
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-sm mx-auto mt-24 bg-white p-8 rounded shadow-md"
//             autoComplete="off"
//         >
//             <div className="flex justify-center mb-6">
//                 {/* Bootstrap logo substitute */}
//                 <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
//                     L
//                 </div>
//             </div>

//             <h2 className="text-center text-2xl font-semibold mb-6">Please sign in</h2>

//             {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//             <div className="mb-4">
//                 <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
//                 <input
//                     type="email"
//                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     autoComplete="new-email"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//                 <input
//                     type="password"
//                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     autoComplete="new-password"
//                 />
//             </div>

//             <div className="flex items-center mb-4">
//                 <input type="checkbox" className="mr-2" />
//                 <label className="text-sm text-gray-700">Remember me</label>
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
//                 disabled={loading}
//             >
//                 {loading ? 'Logging in...' : 'Sign in'}
//             </button>

//             <p className="text-center text-xs text-gray-400 mt-6">© 2017–2025</p>
//         </form>

//     );
// }

// export default Login;