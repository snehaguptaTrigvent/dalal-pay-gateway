import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import MerchantLoginNavigation from '@/components/MerchantLoginNavigation';
import { Mail, ArrowRight, Shield, Building } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;


const MerchantForgotPassword = () => {
	const [formData, setFormData] = useState({ email: "" });
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const { language, t } = useTranslation();

	const validateEmail = (email: string) => /.+@.+\..+/.test(email);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		if (!formData.email.trim()) {
			newErrors.email = "merchant.forgot.emailRequired";
		} else if (!validateEmail(formData.email)) {
			newErrors.email = "merchant.forgot.emailInvalid";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;
		setIsLoading(true);
		try {
			const response = await fetch(`${DALAL_API_BASE_URL}/accounts/forgot-pwd/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: formData.email })
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || 'Reset failed');
			}
			toast({
				title: t("merchant.forgot.successTitle"),
				description: t("merchant.forgot.successDesc")
			});
		} catch (error: any) {
			if (error.message && error.message.includes("no user")) {
				toast({
					variant: "destructive",
					title: t("merchant.forgot.forgotFailed"),
					description: t("merchant.forgot.accountNotFound")
				});
			}else{
				toast({
					variant: "destructive",
					title: t("merchant.forgot.forgotFailed"),
					description: error.message ? t("merchant.forgot.forgotError") : t("merchant.forgot.resetError")
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen">
			<MerchantLoginNavigation />
			<div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
				<div className="w-full max-w-md">
					<Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0">
						{/* Header */}
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Building className="w-8 h-8 text-primary" />
							</div>
							<h1 className="text-2xl font-bold text-foreground mb-2">
								{t("merchant.forgot.title")}
							</h1>
							<p className="text-muted-foreground">
								{t("merchant.forgot.subtitle")}
							</p>
						</div>
						{/* Forgot Password Form */}
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Email Field */}
							<div className="space-y-2">
								<Label htmlFor="email" className="text-foreground font-medium">
									{t("merchant.forgot.emailLabel")}
								</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
									<Input
										id="email"
										type="text"
										placeholder={t("merchant.forgot.emailPlaceholder")}
										value={formData.email}
										onChange={(e) => setFormData({ email: e.target.value })}
										className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
									/>
								</div>
								{errors.email && (
									<p className="text-sm text-destructive mt-1">{t(errors.email)}</p>
								)}
							</div>
							{/* Submit Button */}
									<Button
										type="submit"
										variant="gradient"
										size="lg"
										className="w-full"
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<ArrowRight className="mr-2 w-5 h-5 animate-spin" />
												{t("merchant.forgot.loading")}
											</>
										) : (
											<>
												{t("merchant.forgot.submit")}
												<ArrowRight className="ml-2 w-5 h-5" />
											</>
										)}
									</Button>
						</form>
						{/* Divider */}
						<div className="my-8">
							<Separator />
						</div>
						{/* Back to Login Link */}
						<div className="text-center">
							<p className="text-muted-foreground mb-4">
								{t("merchant.forgot.backToLogin") + " "}
								<Link
									to={`/${language}/merchant/login`}
									className="text-primary font-medium hover:underline"
								>
									{t("merchant.forgot.loginLink")}
								</Link>
							</p>
							{/* Security Badge */}
							<div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
								<Shield className="w-4 h-4" />
								<span>{t("merchant.forgot.securityNote")}</span>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default MerchantForgotPassword;
