import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, UserPlus, Mail, Lock, User, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .nonempty({ message: "O nome é obrigatório" })
    .min(2, { message: "Nome demasiado curto" })
    .max(100, { message: "Nome demasiado longo" }),
  email: z
    .string()
    .trim()
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "Email inválido" })
    .max(255, { message: "Email demasiado longo" }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: "O telefone é obrigatório" })
    .regex(/^[0-9+\s()-]{7,20}$/, {
      message: "Número de telefone inválido",
    }),
  password: z
    .string()
    .nonempty({ message: "A senha é obrigatória" })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .max(100, { message: "Senha demasiado longa" }),
});

type RegisterValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    // Simulação — registo real requer Lovable Cloud
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast({
      title: "Conta criada com sucesso",
      description: `Bem-vindo à COVIA, ${values.fullName}`,
    });
    navigate("/");
  };

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
              <UserPlus className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Criar conta
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Junte-se à COVIA e desbloqueie ofertas exclusivas
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-elegant space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="João Silva"
                  className="pl-9"
                  maxLength={100}
                  {...register("fullName")}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-destructive">{errors.fullName.message}</p>
              )}
            </div>

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
              <Label htmlFor="phone">Número de telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+244 9XX XXX XXX"
                  className="pl-9"
                  maxLength={20}
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
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
                  A criar conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link
                to="/login"
                className="font-semibold text-accent hover:underline"
              >
                Iniciar sessão
              </Link>
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Register;