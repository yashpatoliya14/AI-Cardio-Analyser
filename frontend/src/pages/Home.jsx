import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, TrendingUp, ArrowRight, Activity, Heart, User, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Home = () => {
    return (
        <div className="container mx-auto px-6 py-12 lg:py-20 overflow-hidden">
            {/* Split Layout Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 mx-32 relative">

                {/* Background Decor */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute top-40 right-0 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl -z-10"></div>

                {/* Left Content */}
                <div className="lg:w-1/2 space-y-8 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary/20 shadow-sm transition-all hover:scale-105">
                        <Badge variant="secondary" className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary border-0 rounded-md">UPDATE</Badge>
                        <span className="text-sm font-medium text-slate-600">Logistic Regression Model v2.1 Validated</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                        Predictive <br />
                        <span className="text-primary">Cardiac Risk</span> <br />
                        Modeling
                    </h1>

                    <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                        A clinical decision support tool for cardiovascular risk stratification.
                        Leveraging machine learning to analyze patient vitals and lifestyle biomarkers with high predictive value.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300">
                            <Link to="/predict">
                                Begin Assessment <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-medium rounded-2xl border-2 hover:bg-slate-50 transition-all">
                            <Link to="/about">
                                Clinical Validation
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-3xl font-bold text-slate-900">72.1%</p>
                            <p className="text-sm text-slate-500 font-medium">Model Accuracy</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200"></div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">70k</p>
                            <p className="text-sm text-slate-500 font-medium">Training Cohort</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200"></div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">0.78</p>
                            <p className="text-sm text-slate-500 font-medium">AUC Score</p>
                        </div>
                    </div>
                </div>

                {/* Right Content - Modern Abstract Dashboard Composition */}
                <div className="lg:w-1/2 relative">
                    <div className="relative z-10">
                        {/* Main Floating Card */}
                        <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden relative border animate-in slide-in-from-right-12 duration-1000">
                            <div className="h-2 bg-gradient-to-r from-primary to-emerald-400"></div>
                            <CardContent className="p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">CVD Risk Analysis</p>
                                        <h3 className="text-2xl font-bold text-slate-900">Cardiovascular Profile</h3>
                                    </div>
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Activity className="w-6 h-6 text-primary" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-semibold uppercase">
                                            <Heart className="w-3 h-3" /> Systolic BP
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900">120 <span className="text-sm font-normal text-slate-400">mmHg</span></p>
                                    </div>
                                    <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-semibold uppercase">
                                            <User className="w-3 h-3" /> Age Cohort
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900">45-55</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600 font-medium">Risk Probability</span>
                                        <span className="text-primary font-bold">12% (Low Risk)</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[12%] rounded-full relative">
                                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4 text-xs text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Biomarkers within optimal reference range.</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Floating Element 1 - Behind Right */}
                        <div className="absolute -top-12 -right-12 w-48 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-in fade-in zoom-in duration-1000 delay-300">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                                <div className="h-2 w-1/2 bg-slate-100 rounded-full"></div>
                            </div>
                        </div>

                        {/* Floating Element 2 - Bottom Left */}
                        <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900">Secure Analysis</p>
                                <p className="text-[10px] text-slate-500">End-to-end encrypted</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
                </div>
            </div>

            {/* Feature Cards Grid (Existing) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 mx-32">
                <FeatureCard
                    icon={<Zap className="w-6 h-6 text-amber-500" />}
                    title="Real-time Stratification"
                    description="Immediate cardiovascular risk calculation using optimized clinical algorithms for rapid triage."
                    className="bg-amber-50/40 border-amber-100 hover:border-amber-200 dark:bg-amber-950/10"
                />
                <FeatureCard
                    icon={<TrendingUp className="w-6 h-6 text-primary" />}
                    title="Validated Accuracy"
                    description="Model trained and validated on a retrospective cohort of 70,000+ patient records."
                    className="bg-primary/5 border-primary/10 hover:border-primary/20"
                />
                <FeatureCard
                    icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
                    title="Privacy & Compliance"
                    description="Designed with HIPAA alignment. Data is processed in-memory without persistent storage."
                    className="bg-emerald-50/40 border-emerald-100 hover:border-emerald-200 dark:bg-emerald-950/10"
                />
            </div>

            {/* Existing ROC Section */}
            <div className="mt-24 mb-12 mx-32">
                <Card className="overflow-hidden border-border/50 shadow-2xl bg-card">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2 p-12 space-y-6">
                            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Model Performance
                            </Badge>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Powered by <span className="text-primary">Logistic Regression</span>
                            </h2>

                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Our prediction engine utilizes a calibrated Logistic Regression model, optimized for high sensitivity (True Positive Rate) in medical diagnostics.
                            </p>

                            <ul className="space-y-4 pt-4">
                                {[
                                    "High Area Under Curve (AUC) Score",
                                    "Calibrated for CVD Risk Stratification",
                                    "Validated against Retrospective Clinical Data"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-card-foreground/80">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                            {i + 1}
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:w-1/2 bg-muted/30 p-12 w-full h-full flex flex-col items-center justify-center border-l border-border/50">
                            <h3 className="font-semibold text-foreground mb-6">ROC Curve Analysis</h3>
                            <div className="aspect-video bg-white rounded-xl border shadow-sm p-4 w-full max-w-md relative overflow-hidden flex items-center justify-center">
                                <img
                                    src="/ROC.png"
                                    alt="ROC Curve Analysis"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-xs text-muted-foreground mt-4">
                                *Visual representation of sensitivity vs 1-specificity
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, className }) => (
    <Card className={`transition-all hover:-translate-y-1 hover:shadow-lg duration-300 ${className} border shadow-sm`}>
        <CardContent className="p-8">
            <div className="w-12 h-12 rounded-xl bg-background shadow-sm border flex items-center justify-center mb-6 text-primary">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

export default Home;
