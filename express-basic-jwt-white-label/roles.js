const roles = {
    none: ["viewProducts"],
    seller: ["viewProducts", "addProduct"],
    owner: ["viewProducts", "addProduct", "editProduct"],
};

module.exports = roles;