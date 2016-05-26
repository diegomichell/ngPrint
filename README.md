ngPrint — Generate PDFs from angular the easy way.
==================================================

# Getting Started

> To get started using this module follow the next steps

First add the **ngPrint** module as a dependency to your angular app

```javascript

  angula.module('app', ['ngPrint']);
```

Make sure you have setup the script dependencies described in the **bower.json** file, you need ***html2canvas*** and ***jspdf*** you can get them by adding the following to your *bower.json*

```json
"dependencies": {
  "html2canvas": "^0.4.1",
  "jspdf": "^1.2.61"
}
```

... and then executing

```bash
  bower install
```

>You also need **html2pdf.js** located in the *lib* directory.


Add the scripts in the following order to your main **index.html** file.

```html
<script type="text/javascript" src="bower_components/jspdf/dist/jspdf.min.js"></script>
<script type="text/javascript" src="bower_components/html2canvas/build/html2canvas.min.js"></script>
<script type="text/javascript" src="lib/html2pdf.js"></script>
<script type="text/javascript" src="lib/ngprint.js"></script>
```

### That's it! you're all setup.

## Start using it

>ngPrint consist in a simple **printer** directive that you can add to your action elements like *links* and *buttons*

```html
  <button type="button" printer report-title="Report" printer-data="people" print-on-client="true" report-template-url="{{reportTemplate}}"> Print</button>
```


### Attributes

* **report-title**
  * Defines the name of the of the *.pdf* file to produce.
* **printer-data**
  * Collection of data to be passed to the report template.
* **printer-extra**
  * Object containing any other set of arguments to be passed to the report template.
* **print-on-client**
  * Determines whether to print natively from the browser or send the report to be printed in a server.
* **printer-server-url**
  * Url pointing to the server receiving requests with the templates to be printed.
* **printer-download-url**
  * Url pointing to the server download url for the generated *.pdf* file.
* **printer-on-error**
  * Function to execute if an error ocurre while attempting to generate the *.pdf* file.


# For working code examples on client and server-side printing see the ***samples*** directory.

>####Note: server implementation (php example provided) and wkhtml2pdf are required to be installed on the server in order to used server-side printing.
