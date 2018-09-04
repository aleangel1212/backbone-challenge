# Backbone PLM Challenge Application

React app that utilizes MST and Express to display a product table that can be manipulated via various API calls.

To start developing, you must have docker installed and execute:

To run the app locally:

```bash
git clone https://github.com/aleangel1212/backbone-challenge.git
cd backbone-challenge
docker-compose up -d
```

To install and remove dependencies use the scripts located in the root of the project directory

```bash
./npm-install [docker-container] [dependency-name] [--save || --save-dev]
```

##Usage

To modify product details, click on any product and the editor will appear. Here you can change any of the fields including the product picture.

To delete a product, click on a product and select delete.

You can add products by clicking on + Product button on the nav bar.

You can search through added products via the search bar on the navbar. You can search through products by product name, code, and creator.
