import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;

  title = 'angular-image-file-upload-tutorial';
  PDFfilePath = "";
  imageFilePath = "";
  displayPDF = false;
  pdfFileName= "";
  pngFileName = "";
  originalFilename = "";
  isSubmitted = false;
  // inititialPath="http://localhost:8080";
  inititialPath="https://garysauto2server.herokuapp.com";

  pdfData:any =  {};

  notesList = [];


  autoTypes:any = [
    {
      "name":"Travel Trailer",
      "id":"Travel_Trailer_5th_Wheel"
    },
    {
      "name":"Low Ticket Travel Trailer",
      "id":"LT_Travel_Trailer_5th_Wheel"
    },
    {
      "name":"2020 + Trailer",
      "id":"T2020_Travel_Trailer_5th_Wheel"
    },
    {
      "name":"5th Wheel",
      "id":"5th_Wheel",
    },
    {
      "name":"Low Ticket 5th Wheel",
      "id":"Low_Ticket_5th_Wheel",
    },
    {
      "name":"Toy Hauler",
      "id":"Toy_Hauler_5th_Wheel",
    },
    {
      "name":"Camper",
      "id":"Camper_5th_Wheel",
    },
    {
      "name":"Tent Trailer",
      "id":"Tent_Trailer_5th_Wheel",
    },
    {
      "name":"Motorhome",
      "id":"Motorhome",
    },
    {
      "name":"2020 + Motorhome",
      "id":"Motorhome_2020",
    },
    {
      "name":" Mid to High $ Motorhome",
      "id":"Motorhome_Mid_to_High",
    },
    {
      "name":"High $ Motorhome",
      "id":"Motorhome_High",
    },
    {
      "name":"Older Model",
      "id":"Motorhome_Older",
    },
    {
      "name":"Appraisal",
      "id":"Appraisal",
    }
  ];
  displayStyle = "none";



  openNotes() {
    this.spinner.show();

    let path = this.inititialPath+'/getNotes';
    this.http
      .post<any>(path, {}).subscribe(response => {
    this.spinner.hide();

        if (response.statusCode === 200) {
          this.notesList = response.notes;
          this.displayStyle = "block";
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });

  }
  closePopup() {
    this.displayStyle = "none";
  }

  selectedVehicle:any = this.autoTypes[0];

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  public fileUploadForm: FormGroup;
  public fileInputLabel: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
      distance: [''],
      tires: [''],
      slides: [''],
      adjustment: [''],
      miles_adjustment: [''],
    });


  }


  onFileSelect(event:any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage')!.setValue(file);
  }


  onFormSubmit(): any {
    // console.log("form: ",this.fileUploadForm);

    if (!this.fileUploadForm.get('uploadedImage')!.value) {
      alert('Please add PDF file!');
      return false;
    }
    else if (!this.fileUploadForm.get('distance')!.value) {
      alert('Please add distance!');
      return false;
    }
    else if (!this.fileUploadForm.get('adjustment')!.value && this.fileUploadForm.get('adjustment')!.value!='0') {
      alert('Please add adjustment!');
      return false;
    }
    else if (!this.fileUploadForm.get('tires')!.value) {
      alert('Please select Tires!');
      return false;
    }
    else if (!this.fileUploadForm.get('slides')!.value) {
      alert('Please select Slides!');
      return false;
    }
    else if (!this.selectedVehicle.id.includes('5th_Wheel')&&!this.fileUploadForm.get('miles_adjustment')!.value) {
      alert('Please select miles adjustment!');
      return false;
    }



    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('unit')!.value) {
      alert('Please select unit!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('nonBrand')!.value) {
      alert('Please select non Brand!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('graphics')!.value) {
      alert('Please select graphics!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('awning')!.value) {
      alert('Please select awning!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('upholstery')!.value) {
      alert('Please select upholstery!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('paint')!.value) {
      alert('Please select paint!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('FurnitureReplacement')!.value) {
      alert('Please select Furniture Replacement!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('NeedBatteries')!.value) {
      alert('Please select Need Batteries!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('NeedGenerator')!.value) {
      alert('Please select Need Generator!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('Smokedin')!.value) {
      alert('Please select Smoked in!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('NeedsWindshield')!.value) {
      alert('Please select Needs Windshield!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('MattressMissing')!.value) {
      alert('Please select Mattress Missing!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('Roof')!.value) {
      alert('Please select Roof!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('CarpetCleaning')!.value) {
      alert('Please select Carpet Cleaning!');
      return false;
    }
    else if (this.selectedVehicle.id==='Appraisal'&&!this.fileUploadForm.get('DeepCleaning')!.value) {
      alert('Please select DeepCleaning!');
      return false;
    }



    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage')!.value);

    let uplPath = this.inititialPath+'/uploadfile';
    let uplPath2 = this.inititialPath+'/uploadfile2';
    let addDistance = '?distance='+this.fileUploadForm.get('distance')!.value;
    let addTires = '&tires='+this.fileUploadForm.get('tires')!.value;
    let addSlides = '&slides='+this.fileUploadForm.get('slides')!.value;
    let addAdj = "&adjustment="+this.fileUploadForm.get('adjustment')!.value;
    let addMileAdjs = !this.selectedVehicle.id.includes('5th_Wheel')?"&miles_adjustment="+this.fileUploadForm.get('miles_adjustment')!.value:'';
    let addSelectedType = "&selectedTypeId="+this.selectedVehicle.id;

    let addAppraisal = '';
    if(this.selectedVehicle.id==='Appraisal'){
      addAppraisal = addAppraisal+"&unit="+this.fileUploadForm.get('unit')!.value;
      addAppraisal = addAppraisal+"&nonBrand="+this.fileUploadForm.get('nonBrand')!.value;
      addAppraisal = addAppraisal+"&graphics="+this.fileUploadForm.get('graphics')!.value;
      addAppraisal = addAppraisal+"&awning="+this.fileUploadForm.get('awning')!.value;
      addAppraisal = addAppraisal+"&upholstery="+this.fileUploadForm.get('upholstery')!.value;
      addAppraisal = addAppraisal+"&paint="+this.fileUploadForm.get('paint')!.value;
      addAppraisal = addAppraisal+"&FurnitureReplacement="+this.fileUploadForm.get('FurnitureReplacement')!.value;
      addAppraisal = addAppraisal+"&NeedBatteries="+this.fileUploadForm.get('NeedBatteries')!.value;
      addAppraisal = addAppraisal+"&NeedGenerator="+this.fileUploadForm.get('NeedGenerator')!.value;
      addAppraisal = addAppraisal+"&MattressMissing="+this.fileUploadForm.get('MattressMissing')!.value;
      addAppraisal = addAppraisal+"&Smokedin="+this.fileUploadForm.get('Smokedin')!.value;
      addAppraisal = addAppraisal+"&Roof="+this.fileUploadForm.get('Roof')!.value;
      addAppraisal = addAppraisal+"&CarpetCleaning="+this.fileUploadForm.get('CarpetCleaning')!.value;
      addAppraisal = addAppraisal+"&DeepCleaning="+this.fileUploadForm.get('DeepCleaning')!.value;
    }

    let newPath = uplPath+addDistance+addTires+addAdj+addMileAdjs+addSelectedType+addSlides+addAppraisal;
    console.log("new path: ",newPath);
    this.spinner.show();
    this.http
      .post<any>(newPath, formData).subscribe(response => {
        // console.log("response: ",response);
        if (response.statusCode === 200) {
          this.pdfData = response.pdfData;
          this.PDFfilePath = this.inititialPath+"/pdf/"+response.newFileName;
          this.originalFilename = response.newFileName;

          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = "";
          this.displayPDF = true;
          this.spinner.hide();

        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }


  public openPDF(type:string):void {
    this.spinner.show();

    this.pdfFileName = this.pdfData.year+' '+this.pdfData.Series+' '+this.pdfData.Model+'.'+type;

    let listItem:any;
    let parentDiv:any;
    let label:any;

    let listItemY:any;
    let parentDivY:any;
    let labelY:any;

    let listItemM:any;
    let parentDivM:any;
    let labelM:any;
    // console.log("obj",document.getElementById('htmlData'));
    if(this.pdfData.ManufacturerNote!=''){
      label = document.createElement("label");
      const label_content = document.createTextNode(this.pdfData.ManufacturerNote);
      label.appendChild(label_content);
      label.id = "ManufacturerNote";
      label.style.fontWeight = "500";
      label.style.lineHeight = "15px";
      label.style.fontSize = "14px";

      listItem = document.getElementById("ManufacturerNote")  as HTMLElement;
      parentDiv = listItem.parentNode as HTMLElement;
      parentDiv.replaceChild(label, listItem);
    }

    if(this.pdfData.YearNote!=''){
      labelY = document.createElement("label");
      const label_contentY = document.createTextNode(this.pdfData.YearNote);
      labelY.appendChild(label_contentY);
      labelY.id = "YearNote";
      labelY.style.fontWeight = "500";
      labelY.style.lineHeight = "15px";
      labelY.style.fontSize = "14px";

      listItemY = document.getElementById("YearNote")  as HTMLElement;
      parentDivY = listItemY.parentNode as HTMLElement;
      parentDivY.replaceChild(labelY, listItemY);
    }

    if(this.pdfData.ModelNote!=''){
      labelM = document.createElement("label");
      const label_contentY = document.createTextNode(this.pdfData.ModelNote);
      labelM.appendChild(label_contentY);
      labelM.id = "ModelNote";
      labelM.style.fontWeight = "500";
      labelM.style.lineHeight = "15px";
      labelM.style.fontSize = "14px";

      listItemM = document.getElementById("ModelNote")  as HTMLElement;
      parentDivM = listItemM.parentNode as HTMLElement;
      parentDivM.replaceChild(labelM, listItemM);
    }


    // if(type=='pdf'){

      let DATA = document.getElementById('htmlData') as HTMLCanvasElement;
      // console.log("data: ",DATA);
      html2canvas(DATA).then(canvas => {
        this.spinner.hide();

          let fileWidth = 208;
          let fileHeight = canvas.height * fileWidth / canvas.width;

          const FILEURI = canvas.toDataURL('image/png')
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

          if(type=='pdf'){
            PDF.save(this.pdfFileName);
          }
          else{
            let image = canvas.toDataURL("image/png").replace("image/png", "image/png");
            var link = document.createElement('a');
            link.download = this.pdfFileName;
            link.href = image;
            link.click();
          }
    if(this.pdfData.ManufacturerNote!=''){
      parentDiv.replaceChild(listItem,label);
    }
    if(this.pdfData.YearNote!=''){
      parentDivY.replaceChild(listItemY, labelY);
    }
    if(this.pdfData.ModelNote!=''){
      parentDivY.replaceChild(listItemM, labelM);
    }

      });
    /* }
    else{ */

      /* html2canvas(document.querySelector(".canvasWrapper") as HTMLElement).then((canvas: any) => {


        let ctx = canvas.getContext('2d');
        ctx.scale(3, 3);
        let image = canvas.toDataURL("image/png").replace("image/png", "image/png");
        var link = document.createElement('a');
        link.download = this.pngFileName;
        link.href = image;
        link.click();
      }) */
    // }

  }


  getPDF(){
    this.http.get(this.inititialPath+'/downloadPDF?name='+this.originalFilename, {
      responseType: 'blob'
    }).subscribe(response => {
    // console.log(response);
    FileSaver.saveAs(response, this.pdfFileName);

    }, er => {
      console.log(er);
      alert(er.error.error);
    });


  }



  reset(){
    this.PDFfilePath = "";
    this.imageFilePath = "";
    this.displayPDF = false;
    this.pdfFileName= "";
    this.pngFileName = "";
    this.originalFilename = "";
    this.fileInputLabel="";

    this.selectedVehicle = this.autoTypes[0];


    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
      distance: [''],
      tires: [''],
      slides: [''],
      adjustment: [''],
      miles_adjustment: [''],
    });
  }

  tabchange(obj:any){

    this.PDFfilePath = "";
    this.imageFilePath = "";
    this.displayPDF = false;
    this.pdfFileName= "";
    this.pngFileName = "";
    this.originalFilename = "";
    this.fileInputLabel="";
    this.uploadFileInput.nativeElement.value = "";

    this.selectedVehicle=obj;
    if(this.selectedVehicle.id.includes('5th_Wheel')){
      this.fileUploadForm = this.formBuilder.group({
        uploadedImage: [''],
        distance: [''],
        tires: [''],
        slides: [''],
        adjustment: ['']
      });
    }
    else if(this.selectedVehicle.id.includes('Motorhome')){
      this.fileUploadForm = this.formBuilder.group({
        uploadedImage: [''],
        distance: [''],
        tires: [''],
        slides: [''],
        adjustment: [''],
        miles_adjustment: [''],
      });
    }
    else{
      this.fileUploadForm = this.formBuilder.group({
        uploadedImage: [''],
        distance: [''],
        tires: [''],
        slides: [''],
        adjustment: [''],
        miles_adjustment: [''],
        unit: [''],
        nonBrand: [''],
        graphics: [''],
        awning: [''],
        upholstery: [''],
        paint: [''],
        FurnitureReplacement: [''],
        NeedBatteries: [''],
        NeedGenerator: [''],
        Smokedin: [''],
        NeedsWindshield: [''],
        MattressMissing: [''],
        Roof: [''],
        CarpetCleaning: [''],
        DeepCleaning: ['']
      });
    }
  }




}

