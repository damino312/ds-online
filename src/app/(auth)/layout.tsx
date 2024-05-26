const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-gradient-to-r from-cyan-800 to-blue-700">
      {children}
    </div>
  );
};

export default AuthLayout;
