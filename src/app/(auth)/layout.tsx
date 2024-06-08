const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      {children}
    </div>
  );
};

export default AuthLayout;
