
import React from 'react';
import { Check, X, Star, Zap, TrendingUp, ChevronRight } from 'lucide-react';

export default function UpgradePremium() {

    // Function to handle payment redirection (replace alert with actual navigation later)
    const handleUpgrade = (planName) => {
        alert(`Redirecting for ${planName} Plan Payment...`);
        // In a real application, you would navigate to your payment gateway here:
        // navigate(`/checkout?plan=${planName.toLowerCase().replace(/\s/g, '-')}`);
    };

    const features = [
        { title: "Watermark-Free PDF Download", pro: true, ultimate: true, lite: true }, // Lite also gets 1 PDF
        { title: "Access to Standard Templates", pro: true, ultimate: true, lite: true },
        { title: "Access to Premium Templates", pro: "5 items", ultimate: "All Access", lite: false },
        { title: "Unlimited Resume Downloads", pro: false, ultimate: true, lite: false },
        { title: "Priority Email Support", pro: false, ultimate: true, lite: false },
    ];

    const pricingTiers = [
        {
            key: 'pro',
            name: "Pro",
            price: "499",
            duration: "One-Time",
            isRecommended: false,
            buttonText: "Upgrade to Pro",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            icon: <TrendingUp size={24} className="text-blue-600" />,
            planStyle: "border-2 border-gray-200",
            onClick: () => handleUpgrade("Pro"),
        },
        {
            key: 'ultimate',
            name: "Ultimate",
            price: "999",
            duration: "Yearly",
            isRecommended: true,
            buttonText: "Go Ultimate",
            buttonColor: "bg-green-600 hover:bg-green-700",
            icon: <Zap size={24} className="text-green-600" />,
            planStyle: "border-4 border-green-600 shadow-2xl", // Scale removed, focus on shadow/border
            onClick: () => handleUpgrade("Ultimate"),
        },
        {
            key: 'prolite',
            name: "Pro Lite",
            price: "249",
            duration: "One-Time",
            isRecommended: false,
            buttonText: "Get Pro Lite",
            buttonColor: "bg-purple-600 hover:bg-purple-700",
            icon: <Star size={24} className="text-purple-600" />,
            planStyle: "border-2 border-gray-200",
            onClick: () => handleUpgrade("Pro Lite"),
        },
    ];

    return (
        <div className="p-8 min-h-screen bg-gray-50">

            <header className="text-center max-w-4xl mx-auto mb-12"> {/* mb-16 to mb-12 */}
                <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Premium Access
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
                    Choose the Plan That <span className="text-blue-600">Fits Your Career</span>
                </h1>
                <p className="text-lg text-gray-600 mt-4"> {/* text-xl to text-lg */}
                    Get instant access to features essential for landing your dream job.
                </p>
            </header>

            {/* Pricing Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">

                {pricingTiers.map((tier) => (
                    <div
                        key={tier.name}
                        className={`rounded-2xl p-6 bg-white flex flex-col justify-between min-h-[500px] transition duration-300 hover:shadow-xl ${tier.planStyle}`}
                    >

                        {/* Header Section */}
                        <div className="text-center">
                            {tier.isRecommended && (
                                <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase">
                                    Best Value
                                </span>
                            )}
                            <div className="flex justify-center items-center mb-3">{tier.icon}</div>
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{tier.name}</h2> {/* text-3xl to text-2xl */}
                            <p className="text-4xl font-extrabold mb-6"> {/* text-5xl to text-4xl */}
                                ₹{tier.price}<span className="text-base font-normal text-gray-500"> / {tier.duration}</span>
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="my-4"> {/* my-6 to my-4 */}
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 border-t pt-4"> {/* mb-4 to mb-3 */}
                                Key Features
                            </h3>
                            <ul className="space-y-3 text-left text-gray-700">
                                {features.map((feature, index) => {
                                    let icon = <X size={16} className="text-red-400 mr-2 flex-shrink-0" />; // icon size 18 to 16
                                    let text = feature.title;

                                    // Logic for Pro Plan
                                    if (tier.key === "pro" && feature.pro) {
                                        icon = <Check size={16} className="text-blue-500 mr-2 flex-shrink-0" />;
                                        if (typeof feature.pro === 'string') text += ` (${feature.pro})`;
                                    }
                                    // Logic for Ultimate Plan
                                    else if (tier.key === "ultimate" && feature.ultimate) {
                                        icon = <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />;
                                        if (typeof feature.ultimate === 'string') text += ` (${feature.ultimate})`;
                                    }
                                    // Logic for Pro Lite Plan
                                    else if (tier.key === "prolite" && feature.lite) {
                                        icon = <Check size={16} className="text-purple-500 mr-2 flex-shrink-0" />;
                                        if (typeof feature.lite === 'string') text += ` (${feature.lite})`;
                                    }
                                    // Default to X if not explicitly included in the current tier
                                    else if (feature.pro === true || feature.ultimate === true || feature.lite === true) {
                                        // This handles cases where a feature is generally available but not in this specific tier.
                                        icon = <X size={16} className="text-red-400 mr-2 flex-shrink-0" />;
                                    }


                                    return (
                                        <li key={index} className="flex items-start">
                                            {icon}
                                            <span className='text-sm'>{text}</span> {/* Added text-sm for compactness */}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={tier.onClick}
                            className={`w-full py-3 mt-6 text-white font-bold rounded-lg transition duration-300 shadow-md ${tier.buttonColor} flex items-center justify-center`}
                        >
                            {tier.buttonText} <ChevronRight size={18} className="ml-2" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-10 text-center text-gray-500 text-sm max-w-lg mx-auto">
                <p>
                    <span className="font-semibold">Note:</span> Upgrading allows immediate download. All payments are secured via a third-party gateway.
                </p>
            </div>
        </div>
    );
}