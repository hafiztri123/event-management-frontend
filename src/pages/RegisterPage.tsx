import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterFormData, registerSchema } from "@/schema/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { clearRegisterError, registerUser } from "@/store/slices/authSlices";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";


export default function RegisterPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { isRegistered, isLoading, error } = useSelector((state: RootState) => state.register)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: '',
            email: '',
            password: ''
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (isRegistered) {
            navigate('/login')
        }
    }, [isRegistered, navigate])

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearRegisterError())
        }
    }, [error, dispatch])

    const onSubmit = async (data: RegisterFormData) => {
        await dispatch(registerUser({
            email: data.email,
            password: data.password,
            full_name: data.fullname

        }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Gatherly</CardTitle>
                    <CardDescription className="text-center">Fill the form to start your journey!</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="Jane doe"
                                {...register('fullname')}
                                className={errors.fullname ? 'border-red-500' : ''}
                            />
                            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p> }
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Rat@mail.com"
                                {...register('email')}
                                className={errors.email ? 'border-red-500' : ''}     
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p> }
                        </div>
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('password')}
                                className={` pr-10 ${errors.password ? 'border-red-500':''}`}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                disabled={isLoading}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transorm -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff/> : <Eye/>}
                            </Button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={isLoading}                    
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-purple-600 hover:underline">Sign In</a>
                    </p>

                </CardFooter>
            </Card>
        </div>
    )

}


