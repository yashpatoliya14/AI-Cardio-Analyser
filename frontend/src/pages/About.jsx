import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-foreground mb-8 text-center tracking-tight">About This Project</h1>
            <Card className="max-w-3xl mx-auto border-border/60 shadow-lg">
                <CardContent className="p-8">
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        This application is designed to help users assess their risk of cardiovascular disease using a machine learning model trained on a comprehensive dataset.
                    </p>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        The model takes into account various health factors such as age, gender, height, weight, blood pressure, cholesterol levels, and lifestyle habits like smoking and alcohol consumption.
                    </p>
                    <h2 className="text-2xl font-bold text-primary mb-4">Disclaimer</h2>
                    <p className="text-muted-foreground italic border-l-4 border-primary/20 pl-4 py-1">
                        Please note that this tool is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default About;
