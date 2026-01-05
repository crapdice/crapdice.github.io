/**
 * DRIFTLESS HARVEST APPLICATION
 * 
 * This file contains ALL application logic.
 * DO NOT put copy, content, or product info here.
 * Edit config.js for content changes.
 * 
 * Architecture:
 * - Single global state object (appState)
 * - Stateless render functions that read from appState
 * - Clear view switching via renderView()
 * - No framework dependencies
 */

// ============================================
// APPLICATION STATE
// Single source of truth for the app
// ============================================

const appState = {
    currentView: "home",
    selectedBox: null,
    checkoutStep: 0,
    contactInfo: {},
    cart: []
};

// ============================================
// PERSISTENCE
// Save/load state to localStorage
// ============================================

function saveState() {
    try {
        localStorage.setItem("driftlessHarvestState", JSON.stringify(appState));
    } catch (e) {
        console.warn("Could not save state to localStorage:", e);
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem("driftlessHarvestState");
        if (saved) {
            const parsed = JSON.parse(saved);
            appState.currentView = parsed.currentView || "home";
            appState.selectedBox = parsed.selectedBox || null;
            appState.checkoutStep = parsed.checkoutStep || 0;
            appState.contactInfo = parsed.contactInfo || {};
            appState.cart = parsed.cart || [];
        }
    } catch (e) {
        console.warn("Could not load state from localStorage:", e);
    }
}

// ============================================
// NAVIGATION
// Render and handle navigation
// ============================================

function renderNavigation() {
    const nav = document.getElementById("main-navigation");
    if (!nav) return;
    
    nav.innerHTML = "";
    
    CONFIG.navigation.forEach(item => {
        if (item.hideInNav) return;
        
        const li = document.createElement("li");
        const a = document.createElement("a");
        
        a.href = "#";
        a.textContent = item.label;
        a.className = `block px-3 py-2 rounded transition-colors ${
            appState.currentView === item.id 
                ? "bg-harvest-green text-white font-semibold" 
                : "text-gray-700 hover:bg-gray-100"
        }`;
        
        a.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo(item.id);
        });
        
        li.appendChild(a);
        nav.appendChild(li);
    });
}

function navigateTo(viewId) {
    appState.currentView = viewId;
    
    if (viewId !== "checkout") {
        appState.checkoutStep = 0;
    }
    
    saveState();
    render();
}

// ============================================
// CART INDICATOR
// Show cart status in header
// ============================================

function renderCartIndicator() {
    const indicator = document.getElementById("cart-indicator");
    if (!indicator) return;
    
    if (appState.selectedBox) {
        const box = CONFIG.views.boxes.products.find(p => p.id === appState.selectedBox);
        if (box) {
            indicator.innerHTML = `
                <div class="text-sm">
                    <div class="font-semibold">${box.name}</div>
                    <div class="text-harvest-tan">$${box.price}/week</div>
                </div>
            `;
        }
    } else {
        indicator.innerHTML = `
            <div class="text-sm text-harvest-tan">
                No box selected
            </div>
        `;
    }
}

// ============================================
// VIEW RENDERERS
// Each function renders a specific view
// ============================================

function renderHomeView() {
    const view = CONFIG.views.home;
    
    return `
        <div class="view">
            <div class="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 class="text-4xl font-bold text-harvest-green mb-4">${view.hero.heading}</h2>
                <p class="text-xl text-gray-600 mb-4">${view.hero.subheading}</p>
                <p class="text-gray-700 mb-6 leading-relaxed">${view.hero.description}</p>
                <button 
                    onclick="navigateTo('boxes')" 
                    class="bg-harvest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                    ${view.hero.ctaText}
                </button>
            </div>
            
            ${view.sections.map(section => `
                <div class="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h3 class="text-2xl font-bold text-harvest-green mb-4">${section.heading}</h3>
                    ${section.content.map(paragraph => `
                        <p class="text-gray-700 mb-4 leading-relaxed">${paragraph}</p>
                    `).join("")}
                </div>
            `).join("")}
        </div>
    `;
}

function renderBoxesView() {
    const view = CONFIG.views.boxes;
    
    return `
        <div class="view">
            <div class="mb-8">
                <h2 class="text-4xl font-bold text-harvest-green mb-4">${view.title}</h2>
                <p class="text-gray-700 leading-relaxed">${view.intro}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${view.products.map(product => `
                    <div class="bg-white rounded-lg shadow-md p-6 flex flex-col">
                        <div class="flex-grow">
                            <div class="flex justify-between items-start mb-3">
                                <h3 class="text-2xl font-bold text-harvest-green">${product.name}</h3>
                                <span class="text-2xl font-bold text-harvest-green">$${product.price}</span>
                            </div>
                            
                            <p class="text-sm text-gray-500 mb-3">${product.seasonality}</p>
                            <p class="text-gray-700 mb-4 leading-relaxed">${product.description}</p>
                            
                            <div class="mb-4">
                                <h4 class="font-semibold text-gray-800 mb-2">Typical Contents:</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    ${product.typicalContents.map(item => `
                                        <li class="flex items-start">
                                            <span class="text-harvest-green mr-2">•</span>
                                            <span>${item}</span>
                                        </li>
                                    `).join("")}
                                </ul>
                            </div>
                        </div>
                        
                        <button 
                            onclick="selectBox('${product.id}')"
                            class="w-full ${
                                appState.selectedBox === product.id 
                                    ? "bg-harvest-tan text-harvest-green" 
                                    : "bg-harvest-green text-white hover:bg-opacity-90"
                            } px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            ${appState.selectedBox === product.id ? "✓ Selected" : "Select This Box"}
                        </button>
                    </div>
                `).join("")}
            </div>
            
            ${appState.selectedBox ? `
                <div class="mt-8 bg-harvest-green text-white rounded-lg p-6 text-center">
                    <p class="text-lg mb-4">Ready to proceed with your selection?</p>
                    <button 
                        onclick="navigateTo('checkout')"
                        class="bg-white text-harvest-green px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                    >
                        Continue to Checkout
                    </button>
                </div>
            ` : ""}
        </div>
    `;
}

function renderHowItWorksView() {
    const view = CONFIG.views["how-it-works"];
    
    return `
        <div class="view">
            <div class="mb-8">
                <h2 class="text-4xl font-bold text-harvest-green mb-4">${view.title}</h2>
                <p class="text-gray-700 leading-relaxed">${view.intro}</p>
            </div>
            
            <div class="space-y-6 mb-12">
                ${view.steps.map(step => `
                    <div class="bg-white rounded-lg shadow-md p-6 flex items-start">
                        <div class="flex-shrink-0 w-12 h-12 bg-harvest-green text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                            ${step.number}
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-harvest-green mb-2">${step.heading}</h3>
                            <p class="text-gray-700 leading-relaxed">${step.description}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-8">
                <h3 class="text-2xl font-bold text-harvest-green mb-6">Common Questions</h3>
                <div class="space-y-6">
                    ${view.faq.map(item => `
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">${item.question}</h4>
                            <p class="text-gray-700 leading-relaxed">${item.answer}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `;
}

function renderAboutView() {
    const view = CONFIG.views.about;
    
    return `
        <div class="view">
            <h2 class="text-4xl font-bold text-harvest-green mb-8">${view.title}</h2>
            
            <div class="bg-white rounded-lg shadow-md p-8 mb-8">
                ${view.story.map(paragraph => `
                    <p class="text-gray-700 mb-4 leading-relaxed">${paragraph}</p>
                `).join("")}
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-8">
                <h3 class="text-2xl font-bold text-harvest-green mb-6">Our Partner Farms</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${view.farms.map(farm => `
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-bold text-lg text-harvest-green mb-1">${farm.name}</h4>
                            <p class="text-sm text-gray-500 mb-2">${farm.location}</p>
                            <p class="text-gray-700 text-sm">${farm.specialty}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `;
}

function renderCheckoutView() {
    const currentStep = CONFIG.checkout.steps[appState.checkoutStep];
    const stepCount = CONFIG.checkout.steps.length;
    
    let stepContent = "";
    
    if (appState.checkoutStep === 0) {
        stepContent = renderCheckoutSelectStep();
    } else if (appState.checkoutStep === 1) {
        stepContent = renderCheckoutContactStep();
    } else if (appState.checkoutStep === 2) {
        stepContent = renderCheckoutReviewStep();
    } else if (appState.checkoutStep === 3) {
        stepContent = renderCheckoutConfirmationStep();
    }
    
    return `
        <div class="view">
            <h2 class="text-4xl font-bold text-harvest-green mb-8">Checkout</h2>
            
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="flex items-center justify-between mb-4">
                    ${CONFIG.checkout.steps.map((step, index) => `
                        <div class="flex items-center ${index < stepCount - 1 ? 'flex-1' : ''}">
                            <div class="flex flex-col items-center">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                    index <= appState.checkoutStep 
                                        ? 'bg-harvest-green text-white' 
                                        : 'bg-gray-200 text-gray-500'
                                }">
                                    ${index + 1}
                                </div>
                                <div class="text-xs mt-2 text-center font-medium ${
                                    index === appState.checkoutStep ? 'text-harvest-green' : 'text-gray-500'
                                }">
                                    ${step.title}
                                </div>
                            </div>
                            ${index < stepCount - 1 ? `
                                <div class="flex-1 h-1 mx-2 ${
                                    index < appState.checkoutStep ? 'bg-harvest-green' : 'bg-gray-200'
                                }"></div>
                            ` : ''}
                        </div>
                    `).join("")}
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-8">
                <h3 class="text-2xl font-bold text-harvest-green mb-2">${currentStep.title}</h3>
                <p class="text-gray-600 mb-6">${currentStep.description}</p>
                ${stepContent}
            </div>
        </div>
    `;
}

function renderCheckoutSelectStep() {
    if (!appState.selectedBox) {
        return `
            <div class="text-center py-8">
                <p class="text-gray-600 mb-4">You haven't selected a food box yet.</p>
                <button 
                    onclick="navigateTo('boxes')"
                    class="bg-harvest-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                    Browse Food Boxes
                </button>
            </div>
        `;
    }
    
    const selectedProduct = CONFIG.views.boxes.products.find(p => p.id === appState.selectedBox);
    
    return `
        <div class="border border-gray-200 rounded-lg p-6 mb-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="text-xl font-bold text-harvest-green">${selectedProduct.name}</h4>
                    <p class="text-gray-600 mt-1">${selectedProduct.description}</p>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold text-harvest-green">$${selectedProduct.price}</div>
                    <div class="text-sm text-gray-500">per week</div>
                </div>
            </div>
            <button 
                onclick="navigateTo('boxes')"
                class="text-harvest-green text-sm font-medium hover:underline"
            >
                Change Selection
            </button>
        </div>
        
        <div class="flex justify-end">
            <button 
                onclick="nextCheckoutStep()"
                class="bg-harvest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
                Continue
            </button>
        </div>
    `;
}

function renderCheckoutContactStep() {
    return `
        <form id="contact-form" onsubmit="handleContactFormSubmit(event)" class="space-y-4">
            ${CONFIG.checkout.contactFields.map(field => {
                if (field.type === "select") {
                    return `
                        <div>
                            <label for="${field.id}" class="block text-sm font-medium text-gray-700 mb-1">
                                ${field.label} ${field.required ? '<span class="text-red-500">*</span>' : ''}
                            </label>
                            <select 
                                id="${field.id}" 
                                name="${field.id}"
                                ${field.required ? 'required' : ''}
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-harvest-green focus:border-transparent"
                            >
                                ${field.options.map(opt => `
                                    <option value="${opt.value}" ${appState.contactInfo[field.id] === opt.value ? 'selected' : ''}>
                                        ${opt.label}
                                    </option>
                                `).join("")}
                            </select>
                        </div>
                    `;
                } else if (field.type === "textarea") {
                    return `
                        <div>
                            <label for="${field.id}" class="block text-sm font-medium text-gray-700 mb-1">
                                ${field.label} ${field.required ? '<span class="text-red-500">*</span>' : ''}
                            </label>
                            <textarea 
                                id="${field.id}" 
                                name="${field.id}"
                                rows="4"
                                ${field.required ? 'required' : ''}
                                placeholder="${field.placeholder || ''}"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-harvest-green focus:border-transparent"
                            >${appState.contactInfo[field.id] || ''}</textarea>
                        </div>
                    `;
                } else {
                    return `
                        <div>
                            <label for="${field.id}" class="block text-sm font-medium text-gray-700 mb-1">
                                ${field.label} ${field.required ? '<span class="text-red-500">*</span>' : ''}
                            </label>
                            <input 
                                type="${field.type}" 
                                id="${field.id}" 
                                name="${field.id}"
                                ${field.required ? 'required' : ''}
                                placeholder="${field.placeholder || ''}"
                                value="${appState.contactInfo[field.id] || ''}"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-harvest-green focus:border-transparent"
                            />
                        </div>
                    `;
                }
            }).join("")}
            
            <div class="flex justify-between pt-4">
                <button 
                    type="button"
                    onclick="previousCheckoutStep()"
                    class="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button 
                    type="submit"
                    class="bg-harvest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                    Continue
                </button>
            </div>
        </form>
    `;
}

function renderCheckoutReviewStep() {
    const selectedProduct = CONFIG.views.boxes.products.find(p => p.id === appState.selectedBox);
    
    return `
        <div class="space-y-6">
            <div>
                <h4 class="font-semibold text-gray-800 mb-3">Your Order</h4>
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="font-semibold">${selectedProduct.name}</div>
                            <div class="text-sm text-gray-600">${selectedProduct.seasonality}</div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold">$${selectedProduct.price}</div>
                            <div class="text-sm text-gray-600">per week</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-800 mb-3">Your Information</h4>
                <div class="border border-gray-200 rounded-lg p-4 space-y-2">
                    ${Object.entries(appState.contactInfo).map(([key, value]) => {
                        if (!value) return '';
                        const field = CONFIG.checkout.contactFields.find(f => f.id === key);
                        if (!field) return '';
                        
                        let displayValue = value;
                        if (field.type === "select") {
                            const option = field.options.find(opt => opt.value === value);
                            displayValue = option ? option.label : value;
                        }
                        
                        return `
                            <div class="flex">
                                <span class="text-gray-600 w-40">${field.label}:</span>
                                <span class="font-medium">${displayValue}</span>
                            </div>
                        `;
                    }).join("")}
                </div>
                <button 
                    onclick="previousCheckoutStep()"
                    class="text-harvest-green text-sm font-medium hover:underline mt-2"
                >
                    Edit Information
                </button>
            </div>
            
            <div class="bg-harvest-cream border border-harvest-tan rounded-lg p-4">
                <p class="text-sm text-gray-700">
                    <strong>Note:</strong> This is a demo checkout. In production, this would connect to payment processing. 
                    For now, we'll send you an email with payment instructions.
                </p>
            </div>
            
            <div class="flex justify-between pt-4">
                <button 
                    type="button"
                    onclick="previousCheckoutStep()"
                    class="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button 
                    onclick="confirmOrder()"
                    class="bg-harvest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                    Confirm Order
                </button>
            </div>
        </div>
    `;
}

function renderCheckoutConfirmationStep() {
    const msg = CONFIG.checkout.confirmationMessage;
    
    return `
        <div class="text-center py-8">
            <div class="w-20 h-20 bg-harvest-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            
            <h3 class="text-3xl font-bold text-harvest-green mb-4">${msg.heading}</h3>
            <p class="text-gray-700 mb-8 max-w-2xl mx-auto">${msg.body}</p>
            
            <div class="bg-harvest-cream border border-harvest-tan rounded-lg p-6 max-w-xl mx-auto mb-8">
                <h4 class="font-semibold text-gray-800 mb-3">What Happens Next</h4>
                <ul class="text-left space-y-2">
                    ${msg.nextSteps.map(step => `
                        <li class="flex items-start">
                            <span class="text-harvest-green mr-2 mt-1">✓</span>
                            <span class="text-gray-700">${step}</span>
                        </li>
                    `).join("")}
                </ul>
            </div>
            
            <button 
                onclick="resetCheckout()"
                class="bg-harvest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
                Return to Home
            </button>
        </div>
    `;
}

// ============================================
// ACTION HANDLERS
// Functions triggered by user interactions
// ============================================

function selectBox(boxId) {
    appState.selectedBox = boxId;
    saveState();
    render();
}

function nextCheckoutStep() {
    if (appState.checkoutStep < CONFIG.checkout.steps.length - 1) {
        appState.checkoutStep++;
        saveState();
        render();
        window.scrollTo(0, 0);
    }
}

function previousCheckoutStep() {
    if (appState.checkoutStep > 0) {
        appState.checkoutStep--;
        saveState();
        render();
        window.scrollTo(0, 0);
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    CONFIG.checkout.contactFields.forEach(field => {
        appState.contactInfo[field.id] = formData.get(field.id) || '';
    });
    
    saveState();
    nextCheckoutStep();
}

function confirmOrder() {
    console.log("Order confirmed:", {
        box: appState.selectedBox,
        contact: appState.contactInfo
    });
    
    nextCheckoutStep();
}

function resetCheckout() {
    appState.selectedBox = null;
    appState.checkoutStep = 0;
    appState.contactInfo = {};
    saveState();
    navigateTo('home');
}

// ============================================
// MAIN RENDER FUNCTION
// Orchestrates all rendering
// ============================================

function render() {
    renderNavigation();
    renderCartIndicator();
    
    const contentArea = document.getElementById("app-content");
    if (!contentArea) return;
    
    let viewHTML = "";
    
    switch (appState.currentView) {
        case "home":
            viewHTML = renderHomeView();
            break;
        case "boxes":
            viewHTML = renderBoxesView();
            break;
        case "how-it-works":
            viewHTML = renderHowItWorksView();
            break;
        case "about":
            viewHTML = renderAboutView();
            break;
        case "checkout":
            viewHTML = renderCheckoutView();
            break;
        default:
            viewHTML = `<div class="text-center py-16"><p class="text-gray-600">View not found</p></div>`;
    }
    
    contentArea.innerHTML = viewHTML;
}

// ============================================
// INITIALIZATION
// Load state and render on page load
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    loadState();
    render();
});