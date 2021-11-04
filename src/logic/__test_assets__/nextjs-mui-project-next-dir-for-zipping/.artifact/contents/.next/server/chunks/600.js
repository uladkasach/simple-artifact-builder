"use strict";
exports.id = 600;
exports.ids = [600];
exports.modules = {

/***/ 5730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Copyright)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5246);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Link__WEBPACK_IMPORTED_MODULE_3__);




function Copyright() {
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default()), {
        variant: "body2",
        color: "text.secondary",
        align: "center",
        children: [
            'Copyright \xa9 ',
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Link__WEBPACK_IMPORTED_MODULE_3___default()), {
                color: "inherit",
                href: "https://mui.com/",
                children: "Your Website"
            }),
            ' ',
            new Date().getFullYear(),
            "."
        ]
    }));
};


/***/ }),

/***/ 3086:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export NextLinkComposed */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5246);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_7__);








// Add support for the sx prop for consistency with the other branches.
const Anchor = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_7__.styled)('a')({
});
const NextLinkComposed = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function NextLinkComposed(props, ref) {
    const { to , linkAs , href , replace , scroll , shallow , prefetch , locale , ...other } = props;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
        href: to,
        prefetch: prefetch,
        as: linkAs,
        replace: replace,
        scroll: scroll,
        shallow: shallow,
        passHref: true,
        locale: locale,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Anchor, {
            ref: ref,
            ...other
        })
    }));
});
NextLinkComposed.propTypes = {
    href: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().any),
    linkAs: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([
        (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
        (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
    ]),
    locale: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    passHref: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    prefetch: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    replace: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    scroll: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    shallow: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    to: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([
        (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
        (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
    ]).isRequired
};
// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function Link(props, ref) {
    const { activeClassName ='active' , as: linkAs , className: classNameProps , href , noLinkStyle , role , ...other } = props;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx__WEBPACK_IMPORTED_MODULE_3___default()(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName
    });
    const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);
    if (isExternal) {
        if (noLinkStyle) {
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Anchor, {
                className: className,
                href: href,
                ref: ref,
                ...other
            }));
        }
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Link__WEBPACK_IMPORTED_MODULE_6___default()), {
            className: className,
            href: href,
            ref: ref,
            ...other
        }));
    }
    if (noLinkStyle) {
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NextLinkComposed, {
            className: className,
            ref: ref,
            to: href,
            ...other
        }));
    }
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Link__WEBPACK_IMPORTED_MODULE_6___default()), {
        component: NextLinkComposed,
        linkAs: linkAs,
        className: className,
        ref: ref,
        to: href,
        ...other
    }));
});
Link.propTypes = {
    activeClassName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    as: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([
        (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
        (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
    ]),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    href: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().any),
    noLinkStyle: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    role: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Link);


/***/ }),

/***/ 9856:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ProTip)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5246);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8356);
/* harmony import */ var _mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__);





function LightBulbIcon(props) {
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_SvgIcon__WEBPACK_IMPORTED_MODULE_3___default()), {
        ...props,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
            d: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
        })
    }));
}
function ProTip() {
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4___default()), {
        sx: {
            mt: 6,
            mb: 3
        },
        color: "text.secondary",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LightBulbIcon, {
                sx: {
                    mr: 1,
                    verticalAlign: 'middle'
                }
            }),
            "Pro tip: See more ",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: "https://mui.com/getting-started/templates/",
                children: "templates"
            }),
            " on the MUI documentation."
        ]
    }));
};


/***/ })

};
;