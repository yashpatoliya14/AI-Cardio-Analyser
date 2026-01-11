import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, Calculator, RotateCcw, HeartPulse, UserCircle } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const Predict = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setResult(null);

        // Convert types
        const payload = {
            ...data,
            age: Number(data.age),
            gender: Number(data.gender),
            height: Number(data.height),
            weight: Number(data.weight),
            ap_hi: Number(data.ap_hi),
            ap_lo: Number(data.ap_lo),
            cholesterol: Number(data.cholesterol),
            gluc: Number(data.gluc),
            smoke: data.smoke ? 1 : 0,
            alco: data.alco ? 1 : 0,
            active: data.active ? 1 : 0,
        };

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL +  '/predict', payload);
            setResult(response.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError('Failed to get prediction. Ensure backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const generateOptions = (start, end, step = 1) => {
        const options = [];
        for (let i = start; i <= end; i += step) {
            options.push({ value: String(i), label: String(i) });
        }
        return options;
    };

    const heightOptions = generateOptions(100, 250);
    const weightOptions = generateOptions(30, 200);
    const bpOptions = generateOptions(50, 250, 5);

    // Calculate risk score safely
    const riskScore = result && result.probability && result.probability.length > 1
        ? result.probability[1] * 100
        : 0;

    // Safer default for display color
    const isRisky = riskScore > 50;
    const isHighRisk = riskScore > 75;

    const chartData = [
        { name: 'Risk', value: riskScore },
        { name: 'Remaining', value: 100 - riskScore },
    ];

    return (
        <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-80px)] bg-slate-50/50">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between border-b border-slate-200 pb-8">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-4">
                            <Activity className="w-3 h-3" /> Medical Assessment
                        </span>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Patient Risk Profiler</h1>
                        <p className="text-lg text-slate-600 max-w-2xl">
                            Input clinical parameters below to generate a real-time cardiovascular risk assessment using our advanced logistic regression model.
                        </p>
                    </div>
                    {result && (
                        <Button
                            variant="outline"
                            onClick={() => { setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="mt-6 md:mt-0 gap-2 border-slate-300 text-slate-700 hover:bg-white hover:text-primary transition-all"
                        >
                            <RotateCcw className="w-4 h-4" /> New Assessment
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* Main Form Section */}
                    <div className="xl:col-span-8">
                        <Card className="border-0 shadow-xl shadow-slate-200/60 bg-white overflow-hidden rounded-3xl">
                            <div className="h-2 bg-gradient-to-r from-primary to-emerald-400"></div>
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                                <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <UserCircle className="w-6 h-6 text-primary" />
                                    </div>
                                    Clinical Parameters
                                </CardTitle>
                                <CardDescription className="text-slate-500">
                                    All fields are mandatory for an accurate clinical prediction.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Demographics Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Demographics</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="age" className="text-slate-600">Patient Age (Years)</Label>
                                                <Input id="age" type="number" {...register("age", { required: true })} placeholder="e.g. 55" className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-slate-600">Biological Sex</Label>
                                                <Controller
                                                    name="gender"
                                                    control={control}
                                                    defaultValue="1"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50">
                                                                <SelectValue placeholder="Select gender" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1">Female</SelectItem>
                                                                <SelectItem value="2">Male</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>

                                            <SelectField control={control} name="height" label="Height (cm)" options={heightOptions} placeholder="Select" defaultValue="165" />
                                            <SelectField control={control} name="weight" label="Weight (kg)" options={weightOptions} placeholder="Select" defaultValue="70" />
                                        </div>
                                    </div>

                                    {/* Vitals Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <HeartPulse className="w-4 h-4 text-primary" /> Vitals & Labs
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 space-y-4">
                                                <Label className="text-sky-900 font-semibold">Blood Pressure</Label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <SelectField control={control} name="ap_hi" label="Systolic" options={bpOptions} placeholder="120" defaultValue="120" simpleLabel />
                                                    <SelectField control={control} name="ap_lo" label="Diastolic" options={bpOptions} placeholder="80" defaultValue="80" simpleLabel />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label className="text-slate-600">Cholesterol Level</Label>
                                                    <Controller
                                                        name="cholesterol"
                                                        control={control}
                                                        defaultValue="1"
                                                        render={({ field }) => (
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50">
                                                                    <SelectValue placeholder="Select Level" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="1">Normal</SelectItem>
                                                                    <SelectItem value="2">Above Normal</SelectItem>
                                                                    <SelectItem value="3">Well Above Normal</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-slate-600">Glucose Level</Label>
                                                    <Controller
                                                        name="gluc"
                                                        control={control}
                                                        defaultValue="1"
                                                        render={({ field }) => (
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50">
                                                                    <SelectValue placeholder="Select Level" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="1">Normal</SelectItem>
                                                                    <SelectItem value="2">Above Normal</SelectItem>
                                                                    <SelectItem value="3">Well Above Normal</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lifestyle Section */}
                                    <div className="pt-2">
                                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Patient Lifestyle</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <CheckboxCard control={control} name="smoke" label="Smoker" description="Current User" />
                                                <CheckboxCard control={control} name="alco" label="Alcohol" description="Regular Consumer" />
                                                <CheckboxCard control={control} name="active" label="Active" description="Physical Exercise" />
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all font-bold tracking-wide mt-4" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Activity className="animate-spin mr-2 w-5 h-5" /> Processing Clinical Data...
                                            </>
                                        ) : (
                                            <>
                                                Generate Risk Profile <ChevronRight className="ml-2 w-5 h-5" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Result Sidebar */}
                    <div className="xl:col-span-4 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-right-4">
                                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Analysis Failed</p>
                                    <p className="text-sm opacity-90">{error}</p>
                                </div>
                            </div>
                        )}

                        {result ? (
                            <div className="sticky top-24 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                {/* Primary Result Card */}
                                <Card className={`border-0 shadow-2xl overflow-hidden rounded-[2rem] relative ${isRisky ? 'shadow-red-900/10' : 'shadow-emerald-900/10'}`}>
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 opacity-10 ${isRisky ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-emerald-500 to-teal-500'}`}></div>

                                    <CardContent className="p-8 relative">
                                        <div className="text-center mb-8">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Calculated Probability</h3>
                                            <div className="relative inline-flex items-center justify-center">
                                                <div className={`text-6xl font-black tracking-tighter ${isRisky ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {riskScore.toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`p-6 rounded-2xl border mb-6 ${isRisky ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-full shrink-0 ${isRisky ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                    {isRisky ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                                                </div>
                                                <div>
                                                    <h4 className={`text-lg font-bold mb-1 ${isRisky ? 'text-red-700' : 'text-emerald-700'}`}>
                                                        {isRisky ? 'Elevated Risk Detected' : 'Optimal Health Profile'}
                                                    </h4>
                                                    <p className={`text-sm leading-relaxed ${isRisky ? 'text-red-600' : 'text-emerald-600'}`}>
                                                        {isRisky
                                                            ? 'Patient markers indicate a statistically significant probability of cardiovascular events.'
                                                            : 'No significant risk factors detected based on current clinical inputs.'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Key Contributing Factors</h4>
                                            {/* Dummy logic for contributing factors visualization - usually needs feature importance */}
                                            <ResultRow label="Systolic BP" value={dataToLabel(result.ap_hi || 'Normal')} isBad={isRisky} />
                                            <ResultRow label="BMI Index" value={result.bmi ? result.bmi.toFixed(1) : '-'} isBad={result.bmi > 25} />
                                            <ResultRow label="Age Group" value={result.age || '-'} isBad={result.age > 60} />
                                        </div>
                                    </CardContent>
                                    <div className={`h-2 w-full ${isRisky ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                </Card>

                                <Card className="border-0 shadow-lg bg-slate-900 text-slate-300">
                                    <CardContent className="p-6 text-center">
                                        <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Model Confidence</p>
                                        <div className="flex items-center justify-center gap-2 text-slate-100">
                                            <Activity className="w-4 h-4 text-primary" />
                                            <span className="font-bold">Logistic Regression v1.2</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="sticky top-24">
                                <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50 h-[500px] flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                                        <Calculator className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Analyze</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto">
                                        Complete the clinical form on the left to generate a comprehensive risk profile.
                                    </p>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components

const ResultRow = ({ label, value, isBad }) => (
    <div className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-white">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className={`text-sm font-bold ${isBad ? 'text-red-500' : 'text-slate-700'}`}>{value}</span>
    </div>
);

// Simple logic to show label if needed, essentially just a pass-through here as `result` structure might vary
const dataToLabel = (val) => val;


const SelectField = ({ control, name, label, options, placeholder, defaultValue, simpleLabel }) => (
    <div className="space-y-2">
        {!simpleLabel && <Label className="text-slate-600">{label}</Label>}
        {simpleLabel && <span className="text-xs text-slate-400 font-semibold uppercase">{label}</span>}
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 focus:ring-primary/20">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    </div>
);

const CheckboxCard = ({ control, name, label, description }) => (
    <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
            <label className={`
                relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-white
                ${field.value ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-100 hover:border-slate-200'}
            `}>
                <Checkbox
                    id={name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <div>
                    <span className={`block font-bold ${field.value ? 'text-primary' : 'text-slate-700'}`}>{label}</span>
                    <span className="text-xs text-slate-500 font-medium">{description}</span>
                </div>
            </label>
        )}
    />
);

export default Predict;
