import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({
      username: '',
      email: '',
      password: '',
      role: 'customer',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      toast.success('Registration successful!');
      clearForm();
      navigate('/');
    } catch (err) {
      if (err.status === 409) {
        toast.error('Account already exists');
      } else if (err.status === 400) {
        toast.error('Invalid input. Please check your details.');
      } else {
        toast.error('Something went wrong. Try again later.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-24 bg-white p-8 rounded shadow-md space-y-4"
      autoComplete="off"
    >
      <div className="flex justify-center mb-6">
        <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
          R
        </div>
      </div>

      <h2 className="text-center text-2xl font-semibold mb-6">Create an account</h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
          placeholder="Username"
          required
          autoComplete="new-username"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
          placeholder="Email"
          required
          autoComplete="new-email"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
          placeholder="Password"
          required
          autoComplete="new-password"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
        >
          <option value="customer">User</option>
          <option value="farmer">Farmer</option>
        </select>
      </div>

      {error?.status === 409 && (
        <p className="text-red-600 text-sm text-center">User already exists.</p>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <p className="text-center text-xs text-gray-400 mt-6">© 2017–2025</p>
    </form>
  );
};

export default Register;
