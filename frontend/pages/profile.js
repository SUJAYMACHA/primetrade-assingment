import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FiUser, FiMail, FiPhone, FiEdit2, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Card, { CardBody, CardHeader } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { userAPI } from '../utils/api';
import { getUser, setUser, logout } from '../utils/auth';

export default function Profile() {
  const router = useRouter();
  const currentUser = getUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.data.success) {
        const user = response.data.data.user;
        setProfileData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: user.bio || '',
        });
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
      toast.error('Failed to fetch profile');
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!profileData.name) {
      newErrors.name = 'Name is required';
    } else if (profileData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (profileData.name.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    if (profileData.bio && profileData.bio.length > 500) {
      newErrors.bio = 'Bio cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await userAPI.updateProfile({
        name: profileData.name,
        phone: profileData.phone,
        bio: profileData.bio,
      });

      if (response.data.success) {
        const updatedUser = response.data.data.user;
        setUser(updatedUser);
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.data.success) {
        toast.success('Password changed successfully! Logging out...');
        setShowPasswordForm(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setErrors({});
        
        // Log out user after password change
        setTimeout(() => {
          logout();
          router.push('/login');
        }, 1500);
      }
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Profile - PrimeTrade</title>
        </Head>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            My Profile
          </h1>

          {/* Profile Information */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Profile Information
                </h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    icon={FiEdit2}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {isEditing ? (
                <form onSubmit={handleProfileSubmit}>
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    error={errors.name}
                    icon={FiUser}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    icon={FiMail}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-3 mb-4">
                    Email cannot be changed
                  </p>

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    error={errors.phone}
                    icon={FiPhone}
                    placeholder="Enter your phone number"
                  />

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows="4"
                      placeholder="Tell us about yourself"
                      className={`
                        w-full px-4 py-3 border rounded-lg
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                        transition-all duration-200
                        ${errors.bio ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'}
                      `}
                    />
                    {errors.bio && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bio}</p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        fetchProfile();
                        setErrors({});
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Name</label>
                    <p className="text-lg text-gray-800 dark:text-white font-medium">{profileData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                    <p className="text-lg text-gray-800 dark:text-white">{profileData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Phone</label>
                    <p className="text-lg text-gray-800 dark:text-white">{profileData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Bio</label>
                    <p className="text-gray-800 dark:text-white">{profileData.bio || 'No bio provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Member Since</label>
                    <p className="text-gray-800 dark:text-white">
                      {new Date(currentUser?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Security
                </h2>
                {!showPasswordForm && (
                  <Button
                    onClick={() => setShowPasswordForm(true)}
                    variant="outline"
                    icon={FiLock}
                  >
                    Change Password
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {showPasswordForm ? (
                <form onSubmit={handlePasswordSubmit}>
                  <Input
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    error={errors.currentPassword}
                    icon={FiLock}
                    placeholder="Enter current password"
                  />

                  <Input
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    error={errors.newPassword}
                    icon={FiLock}
                    placeholder="Enter new password (min 6 characters)"
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    error={errors.confirmPassword}
                    icon={FiLock}
                    placeholder="Confirm new password"
                  />

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        });
                        setErrors({});
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Keep your account secure by using a strong password and changing it regularly.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
