import React from 'react';
import { ShieldAlert, FileText, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Disclaimer = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-foreground mb-8 text-center tracking-tight">Legal & Medical Disclaimer</h1>

                <div className="space-y-8">
                    <Section
                        icon={<ShieldAlert className="w-6 h-6 text-destructive" />}
                        title="Medical Disclaimer"
                    >
                        <p className="mb-4">
                            The content, predictions, and analysis provided by CardioPredict are for <strong>informational and educational purposes only</strong>.
                            This application is <strong>not</strong> intended to be a substitute for professional medical advice, diagnosis, or treatment.
                        </p>
                        <p>
                            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                            Never disregard professional medical advice or delay in seeking it because of something you have read or seen on this application.
                        </p>
                    </Section>

                    <Section
                        icon={<FileText className="w-6 h-6 text-amber-500" />}
                        title="Accuracy of Predictions"
                    >
                        <p className="mb-4">
                            Our machine learning model is trained on historical clinical data and provides probability-based assessments.
                            However, <strong>no AI model is 100% accurate</strong>. False positives and false negatives can occur.
                        </p>
                        <p>
                            The risk score generated is a statistical estimation and should not be interpreted as a definitive medical prognosis.
                        </p>
                    </Section>

                    <Section
                        icon={<Lock className="w-6 h-6 text-emerald-500" />}
                        title="Data Privacy"
                    >
                        <p>
                            We prioritize your privacy. The health data you enter into this application is processed in real-time to generate the prediction and is
                            <strong> not stored</strong> on our servers. Once you refresh the page or close the browser, your input data is cleared.
                        </p>
                    </Section>
                </div>

                <div className="mt-12 p-6 bg-muted rounded-xl text-center text-muted-foreground text-sm">
                    <p>&copy; {new Date().getFullYear()} CardioPredict. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

const Section = ({ icon, title, children }) => (
    <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <div className="p-2 bg-muted rounded-lg">
                {icon}
            </div>
            <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
            {children}
        </CardContent>
    </Card>
);

export default Disclaimer;
