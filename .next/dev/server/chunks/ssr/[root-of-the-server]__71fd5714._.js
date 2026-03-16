module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/doce-lucro/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "currency",
    ()=>currency,
    "dateFormatter",
    ()=>dateFormatter,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "generateId",
    ()=>generateId,
    "isBetween",
    ()=>isBetween,
    "startOfMonthISO",
    ()=>startOfMonthISO,
    "sum",
    ()=>sum,
    "todayISO",
    ()=>todayISO
]);
const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});
function formatCurrency(value) {
    return currency.format(Number.isFinite(value) ? value : 0);
}
function formatDate(value) {
    if (!value) return "-";
    return dateFormatter.format(new Date(`${value}T00:00:00`));
}
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
function generateId(prefix) {
    return `${prefix}_${crypto.randomUUID().replaceAll("-", "").slice(0, 10)}`;
}
function todayISO() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
}
function sum(values) {
    return values.reduce((acc, item)=>acc + item, 0);
}
function startOfMonthISO() {
    const now = new Date();
    const local = new Date(now.getFullYear(), now.getMonth(), 1);
    return local.toISOString().slice(0, 10);
}
function isBetween(date, start, end) {
    return date >= start && date <= end;
}
}),
"[project]/Downloads/doce-lucro/lib/seed.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialState",
    ()=>initialState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/utils.ts [app-ssr] (ecmascript)");
;
const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayISO"])();
const initialState = {
    settings: {
        businessName: "Doce Lucro",
        ownerName: "Sua doceira",
        whatsapp: "(11) 99999-9999",
        city: "São Paulo - SP",
        defaultLaborCost: 8,
        defaultExtraCost: 3,
        defaultPackagingCost: 2.5,
        deliveryFeeDefault: 10
    },
    products: [
        {
            id: "product_bolo_pote",
            name: "Bolo no pote de ninho com morango",
            category: "Sobremesas",
            description: "Bolo gelado em pote de 250ml com recheio de ninho e morango.",
            price: 14,
            estimatedCost: 6.2,
            active: true,
            createdAt: today
        },
        {
            id: "product_brownie",
            name: "Brownie recheado",
            category: "Brownies",
            description: "Brownie com casquinha fina e recheio cremoso.",
            price: 10,
            estimatedCost: 4.15,
            active: true,
            createdAt: today
        },
        {
            id: "product_brigadeiro",
            name: "Caixa com 20 brigadeiros gourmet",
            category: "Brigadeiros",
            description: "Brigadeiros enrolados com granulado belga.",
            price: 45,
            estimatedCost: 20.8,
            active: true,
            createdAt: today
        }
    ],
    recipes: [
        {
            id: "recipe_bolo_pote",
            name: "Receita base bolo no pote",
            productId: "product_bolo_pote",
            yieldAmount: 12,
            packagingCost: 2.5,
            laborCost: 8,
            extraCost: 3,
            notes: "Receita com rendimento médio de 12 unidades.",
            createdAt: today,
            ingredients: [
                {
                    id: "ing_1",
                    name: "Leite condensado",
                    quantity: "2 latas",
                    cost: 16
                },
                {
                    id: "ing_2",
                    name: "Creme de leite",
                    quantity: "2 caixas",
                    cost: 8.5
                },
                {
                    id: "ing_3",
                    name: "Leite em pó",
                    quantity: "300g",
                    cost: 10.9
                },
                {
                    id: "ing_4",
                    name: "Morangos",
                    quantity: "2 bandejas",
                    cost: 14
                }
            ]
        },
        {
            id: "recipe_brownie",
            name: "Receita base brownie",
            productId: "product_brownie",
            yieldAmount: 16,
            packagingCost: 1.2,
            laborCost: 7,
            extraCost: 2,
            notes: "Casquinha fina e centro úmido.",
            createdAt: today,
            ingredients: [
                {
                    id: "ing_5",
                    name: "Chocolate meio amargo",
                    quantity: "500g",
                    cost: 16
                },
                {
                    id: "ing_6",
                    name: "Manteiga",
                    quantity: "250g",
                    cost: 9.5
                },
                {
                    id: "ing_7",
                    name: "Açúcar",
                    quantity: "300g",
                    cost: 2.2
                },
                {
                    id: "ing_8",
                    name: "Ovos",
                    quantity: "6 unidades",
                    cost: 6
                }
            ]
        }
    ],
    customers: [
        {
            id: "customer_ana",
            name: "Ana Carolina",
            phone: "(11) 99811-2233",
            city: "Santo André - SP",
            notes: "Cliente fiel, prefere retirada no fim da tarde.",
            birthday: "",
            createdAt: today
        },
        {
            id: "customer_bruna",
            name: "Bruna Lima",
            phone: "(11) 98766-4455",
            city: "São Bernardo - SP",
            notes: "Normalmente encomenda kits festa.",
            birthday: "",
            createdAt: today
        }
    ],
    orders: [
        {
            id: "order_1",
            customerId: "customer_ana",
            orderDate: today,
            deliveryDate: today,
            deliveryMethod: "Retirada",
            channel: "WhatsApp",
            address: "",
            status: "Confirmada",
            notes: "Retirar às 18h.",
            signalPaid: 20,
            discount: 0,
            createdAt: today,
            items: [
                {
                    id: "item_1",
                    productId: "product_bolo_pote",
                    quantity: 6,
                    unitPrice: 14
                }
            ]
        },
        {
            id: "order_2",
            customerId: "customer_bruna",
            orderDate: today,
            deliveryDate: today,
            deliveryMethod: "Entrega",
            channel: "Instagram",
            address: "Rua das Flores, 123",
            status: "Em produção",
            notes: "Entregar até 15h.",
            signalPaid: 30,
            discount: 5,
            createdAt: today,
            items: [
                {
                    id: "item_2",
                    productId: "product_brigadeiro",
                    quantity: 2,
                    unitPrice: 45
                },
                {
                    id: "item_3",
                    productId: "product_brownie",
                    quantity: 8,
                    unitPrice: 10
                }
            ]
        }
    ],
    financeEntries: [
        {
            id: "fin_1",
            type: "Entrada",
            category: "Sinal",
            description: "Sinal da encomenda Bruna",
            amount: 30,
            date: today,
            createdAt: today
        },
        {
            id: "fin_2",
            type: "Saída",
            category: "Ingredientes",
            description: "Compra de chocolate e leite condensado",
            amount: 68.4,
            date: today,
            createdAt: today
        },
        {
            id: "fin_3",
            type: "Saída",
            category: "Embalagens",
            description: "Potes e caixas",
            amount: 22.5,
            date: today,
            createdAt: today
        }
    ]
};
}),
"[project]/Downloads/doce-lucro/lib/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "loadState",
    ()=>loadState,
    "saveState",
    ()=>saveState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/seed.ts [app-ssr] (ecmascript)");
;
const STORAGE_KEY = "doce-lucro:v1";
function loadState() {
    if ("TURBOPACK compile-time truthy", 1) return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialState"];
    //TURBOPACK unreachable
    ;
}
function saveState(state) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/Downloads/doce-lucro/contexts/app-data-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppDataProvider",
    ()=>AppDataProvider,
    "useAppData",
    ()=>useAppData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/seed.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/storage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function reducer(state, action) {
    switch(action.type){
        case "hydrate":
            return action.payload;
        case "add-product":
            return {
                ...state,
                products: [
                    action.payload,
                    ...state.products
                ]
            };
        case "update-product":
            return {
                ...state,
                products: state.products.map((item)=>item.id === action.payload.id ? action.payload : item)
            };
        case "delete-product":
            return {
                ...state,
                products: state.products.filter((item)=>item.id !== action.payload)
            };
        case "add-recipe":
            return {
                ...state,
                recipes: [
                    action.payload,
                    ...state.recipes
                ]
            };
        case "update-recipe":
            return {
                ...state,
                recipes: state.recipes.map((item)=>item.id === action.payload.id ? action.payload : item)
            };
        case "delete-recipe":
            return {
                ...state,
                recipes: state.recipes.filter((item)=>item.id !== action.payload)
            };
        case "add-customer":
            return {
                ...state,
                customers: [
                    action.payload,
                    ...state.customers
                ]
            };
        case "update-customer":
            return {
                ...state,
                customers: state.customers.map((item)=>item.id === action.payload.id ? action.payload : item)
            };
        case "delete-customer":
            return {
                ...state,
                customers: state.customers.filter((item)=>item.id !== action.payload)
            };
        case "add-order":
            return {
                ...state,
                orders: [
                    action.payload,
                    ...state.orders
                ]
            };
        case "update-order":
            return {
                ...state,
                orders: state.orders.map((item)=>item.id === action.payload.id ? action.payload : item)
            };
        case "delete-order":
            return {
                ...state,
                orders: state.orders.filter((item)=>item.id !== action.payload)
            };
        case "add-finance":
            return {
                ...state,
                financeEntries: [
                    action.payload,
                    ...state.financeEntries
                ]
            };
        case "update-finance":
            return {
                ...state,
                financeEntries: state.financeEntries.map((item)=>item.id === action.payload.id ? action.payload : item)
            };
        case "delete-finance":
            return {
                ...state,
                financeEntries: state.financeEntries.filter((item)=>item.id !== action.payload)
            };
        case "update-settings":
            return {
                ...state,
                settings: action.payload
            };
        case "reset-data":
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialState"];
        default:
            return state;
    }
}
const AppDataContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AppDataProvider({ children }) {
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(reducer, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        dispatch({
            type: "hydrate",
            payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadState"])()
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveState"])(state);
    }, [
        state
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            state,
            addProduct: (payload)=>dispatch({
                    type: "add-product",
                    payload: {
                        ...payload,
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])("product"),
                        createdAt: new Date().toISOString()
                    }
                }),
            updateProduct: (payload)=>dispatch({
                    type: "update-product",
                    payload
                }),
            deleteProduct: (id)=>dispatch({
                    type: "delete-product",
                    payload: id
                }),
            addRecipe: (payload)=>dispatch({
                    type: "add-recipe",
                    payload: {
                        ...payload,
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])("recipe"),
                        createdAt: new Date().toISOString()
                    }
                }),
            updateRecipe: (payload)=>dispatch({
                    type: "update-recipe",
                    payload
                }),
            deleteRecipe: (id)=>dispatch({
                    type: "delete-recipe",
                    payload: id
                }),
            addCustomer: (payload)=>dispatch({
                    type: "add-customer",
                    payload: {
                        ...payload,
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])("customer"),
                        createdAt: new Date().toISOString()
                    }
                }),
            updateCustomer: (payload)=>dispatch({
                    type: "update-customer",
                    payload
                }),
            deleteCustomer: (id)=>dispatch({
                    type: "delete-customer",
                    payload: id
                }),
            addOrder: (payload)=>dispatch({
                    type: "add-order",
                    payload: {
                        ...payload,
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])("order"),
                        createdAt: new Date().toISOString()
                    }
                }),
            updateOrder: (payload)=>dispatch({
                    type: "update-order",
                    payload
                }),
            deleteOrder: (id)=>dispatch({
                    type: "delete-order",
                    payload: id
                }),
            addFinance: (payload)=>dispatch({
                    type: "add-finance",
                    payload: {
                        ...payload,
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])("finance"),
                        createdAt: new Date().toISOString()
                    }
                }),
            updateFinance: (payload)=>dispatch({
                    type: "update-finance",
                    payload
                }),
            deleteFinance: (id)=>dispatch({
                    type: "delete-finance",
                    payload: id
                }),
            updateSettings: (payload)=>dispatch({
                    type: "update-settings",
                    payload
                }),
            resetData: ()=>dispatch({
                    type: "reset-data"
                })
        }), [
        state
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppDataContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/doce-lucro/contexts/app-data-context.tsx",
        lineNumber: 205,
        columnNumber: 10
    }, this);
}
function useAppData() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppDataContext);
    if (!context) throw new Error("useAppData must be used inside AppDataProvider");
    return context;
}
}),
"[project]/Downloads/doce-lucro/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Downloads/doce-lucro/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Downloads/doce-lucro/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Downloads/doce-lucro/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Downloads/doce-lucro/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__71fd5714._.js.map