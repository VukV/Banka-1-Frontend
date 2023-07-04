import {Component, ViewChild} from '@angular/core';
import {OrdersService} from "../../../services/orders/orders.service";
import {OrderStatusEnum} from "../../../model/orders/order-status-enum";
import {PopupComponent} from "../../popup/popup/popup.component";

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent {
  orders: any = [];

  loading: boolean = false;
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;

    this.ordersService.getAllOrders(OrderStatusEnum.ON_HOLD, false).subscribe(
      (data) => {
        this.orders = data;
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  approveOrder(orderId: number) {
    this.ordersService.approveOrder(orderId).subscribe({
      next: () => this.getOrders(),
      error: (error) => this.popupComponent.openPopup(error.message)
    });
  }

  rejectOrder(orderId: number) {
    this.ordersService.rejectOrder(orderId).subscribe({
      next: () => this.getOrders(),
      error: (error) => this.popupComponent.openPopup(error.message)
    });
  }

}
