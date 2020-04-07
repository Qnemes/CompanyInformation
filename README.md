# CompanyInformation

The simple web application that retrieves information about companies from the API and puts it in the table.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to install [node.js](https://nodejs.org/en/)

Then, in any command prompt You need to [install](https://www.npmjs.com/package/http-server) http-server globally with npm for testing or local development:

```
npm install http-server -g
```

### Installing

After installing prerequisites just clone the project from GitHub:

```
$ git clone https://github.com/Qnemes/CompanyInformation.git
```

And then start Your http server locally with:

```
http-server "path to the project" 
```
```
For example:
http-server "C:\Users\Desktop\Your application"
```

After that You will be able to access the project under specified ip address: 
```
http://127.0.0.1:port
```

<a href="https://recruitmenttask.netlify.com/" title="Recruitment task" alt="Created by Qnemes">Link to the demo</a>

## Used tools

* [DataTables](https://datatables.net/) - Jquery plugin that generates paginated tables dynamically
* [Chart.js](https://www.chartjs.org/) - JS library for generating bar chart
* [Lodash.js](https://lodash.com/) - Used to manipulate date in easier way
* [Moment.js](https://momentjs.com/) - Used to manipulate date in easier way