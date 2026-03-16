(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/doce-lucro/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/doce-lucro/lib/seed.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialState",
    ()=>initialState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/utils.ts [app-client] (ecmascript)");
;
const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["todayISO"])();
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/doce-lucro/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "loadState",
    ()=>loadState,
    "saveState",
    ()=>saveState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/seed.ts [app-client] (ecmascript)");
;
const STORAGE_KEY = "doce-lucro:v1";
function loadState() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialState"]));
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialState"];
        }
        const parsed = JSON.parse(raw);
        return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialState"],
            ...parsed
        };
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialState"];
    }
}
function saveState(state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/doce-lucro/contexts/app-data-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppDataProvider",
    ()=>AppDataProvider,
    "useAppData",
    ()=>useAppData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/seed.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/doce-lucro/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialState"];
        default:
            return state;
    }
}
const AppDataContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AppDataProvider({ children }) {
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(reducer, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppDataProvider.useEffect": ()=>{
            dispatch({
                type: "hydrate",
                payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadState"])()
            });
        }
    }["AppDataProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppDataProvider.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveState"])(state);
        }
    }["AppDataProvider.useEffect"], [
        state
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AppDataProvider.useMemo[value]": ()=>({
                state,
                addProduct: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "add-product",
                            payload: {
                                ...payload,
                                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])("product"),
                                createdAt: new Date().toISOString()
                            }
                        })
                })["AppDataProvider.useMemo[value]"],
                updateProduct: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "update-product",
                            payload
                        })
                })["AppDataProvider.useMemo[value]"],
                deleteProduct: ({
                    "AppDataProvider.useMemo[value]": (id)=>dispatch({
                            type: "delete-product",
                            payload: id
                        })
                })["AppDataProvider.useMemo[value]"],
                addRecipe: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "add-recipe",
                            payload: {
                                ...payload,
                                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])("recipe"),
                                createdAt: new Date().toISOString()
                            }
                        })
                })["AppDataProvider.useMemo[value]"],
                updateRecipe: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "update-recipe",
                            payload
                        })
                })["AppDataProvider.useMemo[value]"],
                deleteRecipe: ({
                    "AppDataProvider.useMemo[value]": (id)=>dispatch({
                            type: "delete-recipe",
                            payload: id
                        })
                })["AppDataProvider.useMemo[value]"],
                addCustomer: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "add-customer",
                            payload: {
                                ...payload,
                                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])("customer"),
                                createdAt: new Date().toISOString()
                            }
                        })
                })["AppDataProvider.useMemo[value]"],
                updateCustomer: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "update-customer",
                            payload
                        })
                })["AppDataProvider.useMemo[value]"],
                deleteCustomer: ({
                    "AppDataProvider.useMemo[value]": (id)=>dispatch({
                            type: "delete-customer",
                            payload: id
                        })
                })["AppDataProvider.useMemo[value]"],
                addOrder: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "add-order",
                            payload: {
                                ...payload,
                                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])("order"),
                                createdAt: new Date().toISOString()
                            }
                        })
                })["AppDataProvider.useMemo[value]"],
                updateOrder: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "update-order",
                            payload
                        })
                })["AppDataProvider.useMemo[value]"],
                deleteOrder: ({
                    "AppDataProvider.useMemo[value]": (id)=>dispatch({
                            type: "delete-order",
                            payload: id
                        })
                })["AppDataProvider.useMemo[value]"],
                addFinance: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "add-finance",
                            payload: {
                                ...payload,
                                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])("finance"),
                                createdAt: new Date().toISOString()
                            }
                        })
                })["AppDataProvider.useMemo[value]"],
                updateFinance: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "update-finance",
                            payload
                        })
                })["AppDataProvider.useMemo[value]"],
                deleteFinance: ({
                    "AppDataProvider.useMemo[value]": (id)=>dispatch({
                            type: "delete-finance",
                            payload: id
                        })
                })["AppDataProvider.useMemo[value]"],
                updateSettings: ({
                    "AppDataProvider.useMemo[value]": (payload)=>dispatch({
                            type: "update-settings",
                            payload
                        })
                })["AppDataProvider.useMemo[value]"],
                resetData: ({
                    "AppDataProvider.useMemo[value]": ()=>dispatch({
                            type: "reset-data"
                        })
                })["AppDataProvider.useMemo[value]"]
            })
    }["AppDataProvider.useMemo[value]"], [
        state
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppDataContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/doce-lucro/contexts/app-data-context.tsx",
        lineNumber: 205,
        columnNumber: 10
    }, this);
}
_s(AppDataProvider, "BOhqB4lfsJ4GNJ8/HkhgaPrZGwg=");
_c = AppDataProvider;
function useAppData() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppDataContext);
    if (!context) throw new Error("useAppData must be used inside AppDataProvider");
    return context;
}
_s1(useAppData, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppDataProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/doce-lucro/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/doce-lucro/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Downloads/doce-lucro/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Downloads/doce-lucro/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$doce$2d$lucro$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/doce-lucro/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Downloads/doce-lucro/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Downloads_doce-lucro_33835101._.js.map