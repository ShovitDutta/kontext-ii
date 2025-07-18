"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./button";
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                    {" "}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md w-full text-center">
                        {" "}
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" /> <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>{" "}
                        <p className="text-gray-400 mb-6">We encountered an unexpected error. Please try refreshing the page.</p>{" "}
                        <Button onClick={() => window.location.reload()} className="flex items-center space-x-2">
                            {" "}
                            <RefreshCw className="w-4 h-4" /> <span>Refresh Page</span>{" "}
                        </Button>{" "}
                    </motion.div>{" "}
                </div>
            );
        }
        return this.props.children;
    }
}
