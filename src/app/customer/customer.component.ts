import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  CustomerArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  isEditMode = false; // New property to track edit mode

  code: string = "";
  nom: string = "";
  prenom: string = "";
  adresse: string = "";
  tel: number = +216;
  email: string = "";

  currentCustomerID: number =0;
  router: any;

  constructor(private http: HttpClient) {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.http.get("http://localhost:8888/clients")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
      });
  }

  register() {
    const bodyData = {
      "code": this.code,
      "nom": this.nom,
      "prenom": this.prenom,
      "adresse": this.adresse,
      "email": this.email,
      "tel": this.tel
    };

    this.http.post("http://localhost:8888/clients/ajouter", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Customer Registered Successfully");
      this.getAllCustomer();
      this.resetForm();
    });
  }

  setUpdate(data: any) {
    this.code = data.code;
    this.nom = data.nom;
    this.prenom = data.prenom;
    this.adresse = data.adresse;
    this.tel = data.tel;
    this.email = data.email;
    this.isEditMode = true;

    // Set the current customer ID for updating
    this.currentCustomerID = data.id;
  }
  save() {
    if (this.currentCustomerID == 0) {
      console.log("Ajout");
      this.register();
    } else {
      console.log("Update");
      this.updateRecords();
    }
  }
  updateRecords() {
    const bodyData = {
      "id": this.currentCustomerID,  // Include the customer ID in the request body
      "code": this.code,
      "nom": this.nom,
      "prenom": this.prenom,
      "adresse": this.adresse,
      "email": this.email,
      "tel": this.tel
    };
  
    this.http.put("http://localhost:8888/clients/modifier", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Customer Updated Successfully");
      this.getAllCustomer();
      this.resetForm();
    });
  }
  

  setDelete(data: any) {
    this.http.delete(`http://localhost:8888/clients/supprimer/${data.id}`, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Customer Deleted Suceessfully");
      this.getAllCustomer();
      this.resetForm();
    });
  }

  resetForm() {
    this.code = '';
    this.nom = '';
    this.prenom = '';
    this.adresse = '';
    this.tel = 0;
    this.email = '';

    // Reset the current customer ID for updating
    this.currentCustomerID = 0;
  }
  isHomePage(): boolean {
    return this.router.url === '/';
  }
}
