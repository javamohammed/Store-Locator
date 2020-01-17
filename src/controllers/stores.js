const Store = require('../models/Store')
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find()
        return res.status(200).json({
            success:true,
            count: stores.length,
            data: stores
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Server Error'
        })
    }
}

exports.AddStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    return res.status(200).json({
      success: true,
      store: store,
    });
  } catch (error) {
    console.log(error);
    if(error.code === 11000){
        return res.status(500).json({
            error: "This Store already exists!"
    });
    }
    return res.status(500).json({
      error: "Server Error"
    });
  }
};