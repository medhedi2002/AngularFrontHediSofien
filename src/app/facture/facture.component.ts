import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  FactureArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  isEditMode = false; // New property to track edit mode

  dateF: string = '';
  montant: number = 0;
  client_id: string = '';
  devise_id: string = '';
  numero: string = '';

  currentFactureID: number = 0;

  customerList: any[] = [];
  deviseList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllFactures();
    this.getAllCustomers();
    this.getAllDevises();
  }

  getAllFactures() {
    this.http.get("http://localhost:8888/factures")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.FactureArray = resultData;
      });
  }

  getAllCustomers() {
    this.http.get("http://localhost:8888/clients")
      .subscribe((resultData: any) => {
        this.customerList = resultData;
      });
  }

  getAllDevises() {
    this.http.get("http://localhost:8888/devises")
      .subscribe((resultData: any) => {
        this.deviseList = resultData;
      });
  }

  registerFacture() {
    
    const selectedCustomer = this.customerList.find(customer => customer.code === this.client_id);
  const selectedDevise = this.deviseList.find(devise => devise.code === this.devise_id);

    if (!selectedCustomer || !selectedDevise) {
        console.error("Selected customer or devise not found.");
        return;
    }

    // Format the date to match the "yyyy-MM-dd" pattern

    let bodyData = {
      "dateF": this.dateF,
      "montant": this.montant,
      "client": selectedCustomer, // Use the entire customer object
      "devise": selectedDevise, // Use the entire devise object
      "numero": this.numero
  };
  
    this.http.post("http://localhost:8888/factures/ajouter", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Facture Added Successfully");
        this.getAllFactures();
        this.resetForm();
    });
  }
  setUpdate(data: any) {
    this.dateF = data.dateF;
    this.montant = data.montant;
    this.client_id = data.client.code; // Set client_id to customer code
    this.devise_id = data.devise.code; // Set devise_id to devise code
    this.numero = data.numero;
  
    // Set the current facture ID for updating
    this.currentFactureID = data.id;
    this.isEditMode = true; // Set edit mode to true
  }
  
  
  save() {
    if (this.isEditMode) {
      this.updateFacture();
      this.isEditMode = false; // Reset edit mode after updating
    } else {
      this.registerFacture();
    }
  }

  updateFacture() {
    const selectedCustomer = this.customerList.find(customer => customer.code === this.client_id);
    const selectedDevise = this.deviseList.find(devise => devise.code === this.devise_id);
  
    if (!selectedCustomer || !selectedDevise) {
      console.error("Selected customer or devise not found.");
      return;
    }
  
    let bodyData = {
      "id": this.currentFactureID,
      "dateF": this.dateF,
      "montant": this.montant,
      "client": selectedCustomer, // Use the entire customer object
      "devise": selectedDevise, // Use the entire devise object
      "numero": this.numero
    };
  
    this.http.put("http://localhost:8888/factures/modifier" , bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Facture Updated");
      this.getAllFactures();
      this.resetForm();
    });
  }
  
 

  setDelete(data: any) {
    this.http.delete("http://localhost:8888/factures/supprimer/" + data.id, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Facture Deleted");
      this.getAllFactures();
      this.resetForm();
    });
  }

  resetForm() {
    this.dateF = '';
    this.montant = 0;
    this.client_id = '';
    this.devise_id = '';
    this.numero = '';
    this.currentFactureID = 0;
  }
  // ... (existing code)

convertirMontant(facture: any) {
  this.http.get(`http://localhost:8888/factures/convertirMontant/${facture.id}`)
    .subscribe((resultData: any) => {
      console.log(resultData);
      // You may want to update your FactureArray with the converted amount
      // For example, assuming there's a property 'montantApresEchange' in your FactureItem:
      facture.montantApresEchange = resultData;
    });
}

calculerSomme(clientId: string, factureItem: any) {
  this.http.get(`http://localhost:8888/factures/sommeMontantFactureParClient/${clientId}`)
    .subscribe((resultData: any) => {
      console.log(resultData);
      factureItem.sumValue = resultData; // Update the sumValue property of the specific FactureItem
    });
}


  
}
