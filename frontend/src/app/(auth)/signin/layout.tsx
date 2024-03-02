
export default function SigninLayout({children}: {children: React.ReactNode}) {
    return (
        <main className="flex flex-1 items-center justify-center p-4 md:gap-8 md:p-6">
            {children}
        </main>
    );
}
