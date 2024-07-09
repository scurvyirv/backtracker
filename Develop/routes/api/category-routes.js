const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get ALL categories
router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include : [{
        model : Product,
        attributes: ["product_name"]
      }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include : [{
        model : Product,
        attributes: ["product_name"]
      }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

//create new category
router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Perishables",
    }
  */
    Category.create(req.body)
    .then((category) => {
      // if no categories, just respond
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//update category
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.json(category); //respond with the updated category
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//delete category
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
