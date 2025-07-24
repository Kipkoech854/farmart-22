import jwtDecode from 'jwt-decode';

export const getUserRole = () => {
  try {
    const token = localStorage.getItem('user');
    if (!token) return null;
    const decoded = jwtDecode(JSON.parse(token).token);
    return decoded.role;
  } catch {
    return null;
  }
};
    //     if (res.ok) {
    //         dispatch(logout());
    //         navigate('/login');
    //     } else {
    //         console.error('Profile deletion failed');
    //     }
    //     } catch {
    //     console.error('Profile deletion error');
    //     }
    // };
    
    // return (
    //     <div>
    //     {profile ? (
    //         <div>
    //         <h1>{profile.name}'s Profile</h1>
    //         <p>Email: {profile.email}</p>
    //         {editing ? (
    //             <form onSubmit={handleEdit}>
    //             <input
    //                 type="text"
    //                 value={form.name}
    //                 onChange={(e) => setForm({ ...form, name: e.target.value })}
    //             />
    //             <input
    //                 type="email"
    //                 value={form.email}
    //                 onChange={(e) => setForm({ ...form, email: e.target.value })}
    //             />
    //             <button type="submit">Save</button>
    //             </form>
    //         ) : (
    //             <button onClick={() => setEditing(true)}>Edit Profile</button>
    //         )}
    //         <button onClick={handleDelete}>Delete Account</button>
    //         </div>
    //     ) : (
    //         <p>Loading profile...</p>
    //     )}
    //     </div>
    // );
    // };