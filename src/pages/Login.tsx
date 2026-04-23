import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, LogIn, Mail, Lock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "Email inválido" })
    .max(255, { message: "Email demasiado longo" }),
  password: z
    .string()
    .nonempty({ message: "A senha é obrigatória" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "Senha demasiado longa" }),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    // Simulação — autenticação real requer Lovable Cloud
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast({
      title: "Sessão iniciada",
      description: `Bem-vindo de volta, ${values.email}`,
    });
    navigate("/");
  };

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
              <LogIn className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Iniciar sessão
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Entre na sua conta COVIA para continuar
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-elegant space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className="pl-9"
                  maxLength={255}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-accent"
                >
                  Esqueceu?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  maxLength={100}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  A entrar...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Ainda não tem conta?{" "}
              <Link
                to="/register"
                className="font-semibold text-accent hover:underline"
              >
                Criar conta
              </Link>
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Login;