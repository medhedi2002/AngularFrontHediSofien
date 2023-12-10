import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// ... Existing imports ...

@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.scss']
})
export class DeviseComponent {
  DeviseArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  isEditMode = false; // New property to track edit mode


  code: string = ''; // New code field
  symbole: string = '';
  taux: number = 0;

  currentDeviseID: number=0;
  router: any;

  constructor(private http: HttpClient) {
    this.getAllDevise();
  }

  getAllDevise() {
    this.http.get("http://localhost:8888/devises")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);  // Add this line to log the result
        this.DeviseArray = resultData;
      });
  }
  
  

  registerDevise() {
    const bodyData = {
      "code": this.code, // New code field
      "symbole": this.symbole,
      "taux": this.taux
    };

    this.http.post("http://localhost:8888/devises/ajouter", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Devise Added Successfully");
      this.getAllDevise();
      this.resetForm();
    });
  }

  setUpdateDevise(data: any) {
    this.code = data.code; // New code field
    this.symbole = data.symbole;
    this.taux = data.taux;
    this.isEditMode = true;

    // Set the current devise ID for updating
    this.currentDeviseID = data.id;
  }


  save() {
    
      if (this.currentDeviseID ==0) {
        console.log("Ajout");

        this.registerDevise();
      } else {
        console.log("update");

        this.updateDevise();
      }
    }
  
  updateDevise() {
    const bodyData = {
      "id": this.currentDeviseID, 
      "code": this.code, // New code field
      "symbole": this.symbole,
      "taux": this.taux
    };

    this.http.put("http://localhost:8888/devises/modifier" , bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Devise Updated");
      this.getAllDevise();
      this.resetForm();
    });
  }

  setDeleteDevise(data: any) {
    this.http.delete("http://localhost:8888/devises/supprimer/" + data.id, { responseType: 'text' })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Devise Deleted");
        this.getAllDevise();
        this.resetForm();
      });
  }
  

  resetForm() {
    this.code = ''; // New code field
    this.symbole = '';
    this.taux = 0;

    this.currentDeviseID = 0;
  }
  isHomePage(): boolean {
    return this.router.url === '/';
  }
}
