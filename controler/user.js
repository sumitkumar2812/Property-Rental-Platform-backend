const User = require("../model/User")

async function handlePostAll(req, res) {
    const body = req.body;
    if (!body || !body.Name || !body.email || !body.gender) {
        return res
            .status(400)
            .json({ msg: "Name, email, gender are Required." })
    }
    try {
        const result = await User.create({
            Name: body.Name,
            email: body.email,
            gender: body.gender,
        });
        console.log(result);
        return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};

async function handleGetAll(req, res) {
    res.setHeader("X-myAccount", "987654")
    console.log(req.headers);
    res.json(User);
    req.send(users);
}

async function handleGetById(req, res) {
    const id = Number(req.params.id)
    const user = User.find((user) => user.id === id)
    return res.json(user)
}

async function handlePatchById(req, res) {
    return res.json({ status: "patch is pending" })
}


async function handleDeleteById(req, res) {
    return res.json({ status: "delete is pending" })
}


module.exports = { handlePostAll, handleGetAll, handleGetById, handleDeleteById, handlePatchById }
