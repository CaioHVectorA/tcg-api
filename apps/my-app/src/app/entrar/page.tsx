'use client'

import * as React from 'react'
import { useState } from 'react'
import { Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

const loginSchema = z.object({
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
})

const registerSchema = z.object({
    username: z.string().min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
})

const LoginForm = ({ onSubmit }: {
    onSubmit: (values: z.infer<typeof loginSchema>) => void
}) => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="treinador@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Entrar</Button>
            </form>
        </Form>
    )
}

const RegisterForm = ({ onSubmit }: {
    onSubmit: (values: z.infer<typeof registerSchema>) => void
}) => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome de usuário</FormLabel>
                            <FormControl>
                                <Input placeholder="AshKetchum151" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="treinador@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Criar Conta</Button>
            </form>
        </Form>
    )
}

const GuestLoginDialog = ({ isOpen, onClose }: {
    isOpen: boolean
    onClose: () => void
}) => (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Entrar como Convidado</AlertDialogTitle>
                <AlertDialogDescription>
                    Você está prestes a entrar como convidado. Suas atividades serão limitadas e não serão salvas. Deseja continuar?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onClose}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)

export default function LoginRegisterPage() {
    const [activeTab, setActiveTab] = useState('login')
    const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false)

    function onLoginSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
        // Handle login logic here
    }

    function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values)
        // Handle registration logic here
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center bg-blend-darken p-4 bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(/wallpaper.jpg)]">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-background/80 backdrop-blur-none rounded-lg p-8">
                <div className="flex flex-col justify-center items-center bg-primary text-primary-foreground p-8 rounded-lg">
                    <img src="/placeholder.svg?height=100&width=100" alt="TCG Logo" className="w-24 h-24 mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Pokémon TCG Simulator</h1>
                    <p className="text-center">Colecione, troque e batalhe com seus cards Pokémon favoritos!</p>
                </div>
                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
                        <CardDescription className="text-center">
                            {activeTab === 'login' ? 'Entre na sua conta' : 'Crie uma nova conta'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Entrar</TabsTrigger>
                                <TabsTrigger value="register">Registrar</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <LoginForm onSubmit={onLoginSubmit} />
                            </TabsContent>
                            <TabsContent value="register">
                                <RegisterForm onSubmit={onRegisterSubmit} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Google
                                </Button>
                                <Button variant="outline" onClick={() => setIsGuestDialogOpen(true)}>
                                    <User className="mr-2 h-4 w-4" />
                                    Convidado
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <GuestLoginDialog isOpen={isGuestDialogOpen} onClose={() => setIsGuestDialogOpen(false)} />
        </div>
    )
}