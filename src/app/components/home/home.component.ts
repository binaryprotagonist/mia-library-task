import { MiaPagination, MiaQuery } from '@agencycoda/mia-core';
import { BoxFieldComponent, ColorSelectorFieldComponent, ImagesFieldComponent, MiaField, MiaFilterBoxConfig, MiaFilterSelected, MiaFilterType, MiaFormComponent, MiaFormConfig, MiaFormModalComponent, MiaFormModalConfig, MiaFormModalsService, MiaFormModalV2Component, MiaFormModalV2Config, MiaFormModalV3Config, MiaFormWizardConfig, PositionFieldComponent, RowFieldComponent, SizeRadioFieldComponent, SliderFieldComponent, SwitchFieldComponent, TabsFieldComponent } from '@agencycoda/mia-form';
import { MiaColumn, MiaTableConfig } from '@agencycoda/mia-table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('miaForm') miaForm!: MiaFormComponent;

  config!: MiaFormConfig;
  item;

  filterBox!: MiaFilterBoxConfig;
  queryFilter!: MiaQuery;
  testService: any;
  contactService: any;

  constructor(
    protected dialog: MatDialog,
    protected formModals: MiaFormModalsService,
    private _httpService : HttpService) { }
  tableConfig: MiaTableConfig = new MiaTableConfig();

  tableDataEditable: Array<any> = [];

  mockData?: MiaPagination<any>;

  queryScroll = new MiaQuery();

  loadConfig() {
    //this.tableConfig.service = this.testService;
    // this.tableConfig.id = 'table-test';
    this.tableConfig.columns = [
      { key: 'selection', type: 'selection', title: '' },
      //{ key: 'id', type: 'string', title: 'ID', field_key: 'id' },
      { key: 'item-role', type: 'item-relation', title: 'Role', field_key: 'role_id', extra: { field_display: 'title', field_relation_id: 'id'} },
      { key: 'photo', type: 'photo', title: 'Photo', field_key: 'photo' },
      { key: 'custom', type: 'custom', title: 'Custom' },
      { key: 'user', type: 'user', title: '#User', extra: { 
        field_photo: 'photo', field_firstname: 'firstname', field_lastname: 'lastname', field_subtitle: 'role', field_is_online: 'is_online' 
      } },
      { key: 'title', type: 'string', title: 'Titulo', field_key: 'title', extra: { conditional_field: 'status' } },
      { key: 'status', type: 'status', title: 'Estado', field_key: 'status', extra: {
        options: [
          { value: 0, title: 'Estado 1', color: 'warning' },
          { value: 1, title: 'Estado 2', color: 'error' },
          { value: 2, title: 'Estado 3', color: 'violet' },
          { value: 3, title: 'Estado 4', color: 'success' },
          { value: 4, title: 'Estado 5', color: 'blue' },
          { value: 5, title: 'Estado 6', color: 'cyan' },
          { value: 6, title: 'Estado 7', color: 'pink' },
          { value: 7, title: 'Estado 8', color: '' },
        ]
      } },
      { key: 'created_at', type: 'date', title: 'Created At', field_key: 'created_at' },
      { key: 'icon', type: 'icon-toggle', title: '', field_key: 'status', extra: {
        key_action: 'click-lock',
        options: [
          { value: 0, color: 'red', icon: 'lock' },
          { value: 1, color: '#000', icon: 'lock-open' },
        ]
      } },
      { key: 'array-example', type: '', title: 'Array', extra: {
        field_array_key: 'categories', field_print_key: 'title'
      } },
      { key: 'more', type: 'more', title: '', extra: {
        actions: [
          { icon: 'visibility', title: 'View', key: 'view' },
          { icon: 'create', title: 'Edit', key: 'edit' },
          { icon: 'delete', title: 'Delete', key: 'remove' },
        ]
      } },
      { 
        key: 'more-option', 
        type: '', 
        title: '',
        field_key: 'role_id',
        extra: {
          actions: {
            1: [
              { icon: 'create', title: 'Edit', key: 'edit' },
            ],
            4: [
              { icon: 'visibility', title: 'View', key: 'view' },
              { icon: 'create', title: 'Edit', key: 'edit' },
              { icon: 'delete', title: 'Delete', key: 'remove' },
            ]
          }
        }
      }
    ];

    this.tableConfig.loadingColor = 'red';
    this.tableConfig.hasEmptyScreen = true;
    this.tableConfig.emptyScreenTitle = 'No tenes cargado ningun elemento todavia';

    this.tableConfig.onClick.subscribe(result => {
      console.log('--ACTION--');
      console.log(result.key);
    });

    this.mockData = {
      current_page: 1,
      first_page_url: '',
      from: '',
      last_page: 1,
      last_page_url: '',
      next_page_url: '',
      path: '',
      per_page: 50,
      prev_page_url: '',
      to: '',
      total: 1,
      data: [
        {
          id: 1, role_id: 1, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png', subtitle: 'Administrador', is_online: 0, status: 1, created_at: '1989-08-25 18:00:00'
        },
        {
          id: 2, role_id: 3, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png', subtitle: 'Administrador', is_online: 0, status: 1, created_at: '1989-08-25 18:00:00', categories: [ { title: 'category One'}, { title: 'category Two'} ]
        },
        {
          id: 3, role_id: 1, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: '', subtitle: 'Administrador', is_online: 0, created_at: '1989-08-25 18:00:00'
        },
        {
          id: 4, role_id: 4, title: 'asdasdasd', firstname: 'Matias', lastname: 'Camiletti', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png', subtitle: 'Administrador', is_online: 0, status: 1, created_at: '1989-08-25 18:00:00'
        }
      ]
    };
  }



  ngOnInit(): void {

    this.loadConfig();
    this.loadItem();
    this.loadForm();
    this.loadFilterBox();

    this._httpService.list({}).subscribe((result)=>{
      this.mockData = result; 
    })
  }





  onClickSend() {
    this.miaForm.submit().subscribe(result => {
      console.log('--Observable--');
      console.log(result);
      /*alert(result.margin.top);
      alert(result.margin.right);
      alert(result.margin.bottom);
      alert(result.margin.left);*/
    });
  }

  onChangeDateFilter(result: any) {
    console.log(result);
  }

  onSubmit(item) {
    console.log('--SUBMIT--');
    console.log(item);
    //alert('asddas');
  }

  loadItem() {
    // this.item = new Entity();
    /*this.item.title = 'Noticia titue';
    this.item.subtitle = 'Subitulo';*/
    this.item.firstname = 'Matias';
    this.item.firstname2 = 'Matias Ca';
    this.item.caption = 'asld jasld kjaslkdjaklj dakls jdalkjd aslkdj alkdj aklj dalkajslk jadlsk jakslsd lakj';
    this.item.status = 1;
    this.item.city_id = 1;
    this.item.date = '2021-04-08 04:20:00';
    this.item.tags = ['tag1', 'tag2', 'tag3'];
    this.item.event_start = '2021-07-19 16:00:00';
    this.item.event_end = '2021-07-20 18:00:00';
    this.item.margin = { top: 20, left: 30, bottom: 40, right: 0 };
    this.item.vendors = [
      { id: 1, title: 'Vendor 1' }
    ];
    this.item.file_one = { name: 'File.pdf', url: '', size: 500, mediaLink: '' };
  }

  loadFormMarketplace() {
    this.config = new MiaFormConfig();
    this.config.hasSubmit = false;
    this.config.fields = [
      { key: 'box-one', type: MiaField.TYPE_CUSTOM, extra: {
        component: BoxFieldComponent,
        fields: [
        { key: 'features', type: MiaField.TYPE_CHIPS_AND_SELECT, label: '', caption: '', extra: {
          title: 'Valores del producto', field_display: 'title',
          options: [
            { id: 0, title: 'Reciclado' },
            { id: 1, title: 'Rehusado' },
            { id: 2, title: 'Sustentable' },
            { id: 3, title: 'Libre de animal' },
          ]
        } },
        { key: '', type: MiaField.TYPE_LABEL, label: 'Marca del producto', classes: 'label-form' },
        { key: 'brand', type: 'string', label: 'Marca del producto' },
        { key: 'caption', type: MiaField.TYPE_TEXT, label: 'Descripcion del producto' },
        { key: 'row-one', type: MiaField.TYPE_CUSTOM, extra: {
          component: RowFieldComponent,
          fields: [
          { key: '', type: MiaField.TYPE_LABEL, label: 'Precio' },
          { key: '', type: MiaField.TYPE_LABEL, label: 'Categoría' },
        ] }  },
        { key: 'row-one', type: MiaField.TYPE_CUSTOM, extra: {
          component: RowFieldComponent,
          fields: [
          { key: 'price', type: 'string', label: 'Precio' },
          { key: 'category', type: 'string', label: 'Categoria' },
        ] }  }
      ] }  },
      { key: 'city_id', type: MiaField.TYPE_CITY, label: 'Ciudad', extra: { basePath: 'http://0.0.0.0:8080/' } },
    ];
    this.config.errorMessages = [
      { key: 'required', message: 'The %label% is required.' }
    ];
  }

  loadForm() {
    this.config = new MiaFormConfig();
    this.config.hasSubmit = false;
    this.config.fields = [
      { key: '', type: MiaField.TYPE_LABEL, label: '<h2>-- Photo --</h2>', classes: 'label-custom' },
      { key: 'photo', type: MiaField.TYPE_PHOTO, label: 'Photo', caption: 'Foto del usuario.' },

      { key: '', type: MiaField.TYPE_LABEL, label: '<p><b>Input text (type: "string")</b></p>', },
      { key: 'title', type: 'string', label: 'Title', validators: [Validators.required], caption: 'El titulo de la noticia.' },

      { key: '', type: MiaField.TYPE_LABEL, label: '<p><b>Input autocomplete (type: "MiaField.TYPE_LABEL")</b></p>', },
      { key: 'product', type: 'autocomplete', label: 'Write something', extra: {
        options: ['One', 'Two', 'Three']
      }},
      { key: '', type: MiaField.TYPE_LABEL, label: '<p><small>Input autocomplete service (type: "autocomplete-service")</small></p>', },
      //{ key: 'vendor', type: 'autocomplete-service', label: 'Write something', extra: { service: this.testService, field_display: 'title', query: new MiaQuery() } },

      /* { key: 'caption', type: 'string' }, */
      /* { key: 'subtitle', type: 'string', }, */

      { key: '', type: MiaField.TYPE_LABEL, label: '<p><b>Input date (type: "date")</b></p>', },
      { key: 'date', type: 'date', label: 'Fecha' },

      { key: '', type: MiaField.TYPE_LABEL, label: '<p><b>Input autocomplete Add element (type: "list-service")</b></p>', },
      //{ key: 'vendors', type: 'list-service', extra: { service: this.testService, field_display: 'title', field_list: 'vendors-auto', query: new MiaQuery() } },

      { key: '', type: MiaField.TYPE_LABEL, label: '<p><b>Text HTML (type: "MiaField.TYPE_LABEL")</b></p>', },
      { key: '', type: MiaField.TYPE_LABEL, label: 'Esto es una <strong>prueba</strong> texto plano sin funcionalidad, admite HTML.', classes: 'label-custom' },

      { key: '', type: MiaField.TYPE_LABEL, label: '<p><b>Input Selector (type: "select")</b></p>', },
      { key: 'status', type: 'select', label: 'Select a choice', extra: {
        options: [
          { id: 0, title: 'Status 1' },
          { id: 1, title: 'Status 2' },
          { id: 2, title: 'Status 3' },
        ],
        can_add: true,
        add_title: 'Add new Status',
        add_subject: new Subject<any>().pipe(switchMap(it => of({ id: 3, title: 'Estado 4'})))
      }},
      { key: '', type: MiaField.TYPE_LABEL, label: '<p><small>Input Selector service (type: "select-service")</small></p>', },
      //{ key: 'vendor-select', type: 'select-service', label: 'Select a choice', extra: { service: this.testService, field_display: 'title', query: new MiaQuery() } },

      { key: '', type: MiaField.TYPE_LABEL, label: '<p><b>Add users (type: "avatars")</b></p>', },
      //{ key: 'avatars', type: 'avatar-list-service', extra: { service: this.testService, field_display: 'title', field_photo: 'photo', field_list: 'avatars-auto', query: new MiaQuery() } },

      { key: 'data', type: MiaField.TYPE_LIST_STRING, label: 'Items:', caption: '' },
      { key: 'chips', type: MiaField.TYPE_CHIPS_AND_SELECT, label: '', caption: '', extra: {
        title: 'State', field_display: 'title',
        options: [
          { id: 0, title: 'State 1' },
          { id: 1, title: 'State 2' },
          { id: 2, title: 'State 3' },
        ]
      } },
      { key: 'tag', type: MiaField.TYPE_STRING_WITH_COLOR, label: 'Tag name', caption: '', appearance: 'outline', extra: { key_color: 'color' } },
      { key: 'divider-1', type: MiaField.TYPE_DIVIDER },
      { key: 'row-one', type: MiaField.TYPE_CUSTOM, extra: {
        component: RowFieldComponent,
        fields: [
        { key: 'firstname', type: 'string', label: 'Nombre' },
        { key: 'lastname', type: 'string', label: 'Apellido' },
      ] }  },
      { key: 'tags', type: MiaField.TYPE_TAGS, label: 'Tags', caption: '', appearance: 'outline' },
      { key: 'chips-service', type: MiaField.TYPE_CHIPS_AND_SELECT_SERVICE, label: 'Seleccionador multiple chip', caption: '', extra: { title: 'Multiple chips service', service: this.testService, field_display: 'title', field_list: 'chips-auto', query: new MiaQuery(), limit: 2, limit_message_error: 'Ha superado el limite' } },
      { key: 'chips-service-with-add', type: MiaField.TYPE_CHIPS_AND_SELECT_SERVICE, label: 'Seleccionador multiple chip', caption: '', extra: {
        title: 'Multiple chips service',
        service: this.testService,
        field_display: 'title',
        field_list: 'chips-auto',
        query: new MiaQuery(),
        can_add: true,
        add_title: 'Add new Status',
        add_subject: new Subject<any>().pipe(switchMap(it => of({ id: 30, title: 'Estado 4'}))) }
      },
      { key: 'content-html', type: MiaField.TYPE_HTML, label: 'Contenido del post', caption: '', extra: { height: 400 } },
      { key: 'title-header', type: MiaField.TYPE_STRING_TITLE, placeholder: 'Write your title', caption: '' },
      { key: 'photo-header', type: MiaField.TYPE_PHOTO_HEADER, label: 'Photo Header', caption: 'Foto del header.', extra: { saveObj: true } },
      { key: 'event_start', type: MiaField.TYPE_EVENT, label: 'Fecha del evento', extra: { field_end_key: 'event_end'} },
      { key: 'custom_example', type: MiaField.TYPE_CUSTOM},
      { key: 'file_one', type: MiaField.TYPE_FILE_ONE, label: 'Propuesta' },
      { key: 'input-with-chips', type: MiaField.TYPE_INPUT_WITH_CHIP_SERVICE, label: 'Escribir chips', caption: '', extra: { title: 'Escribir chips', service: this.testService, field_display: 'title', field_list: 'chips-auto', query: new MiaQuery() } },
      { key: 'tabs-one', type: MiaField.TYPE_CUSTOM, extra: {
        component: TabsFieldComponent,
        tabs: [
          { title: 'Tab One', fields: [
            { key: 'firstname2', type: 'string', label: 'Nombre' },
            { key: 'lastname2', type: 'string', label: 'Apellido' },
          ] },
          { title: 'Tab Two', fields: [
            { key: 'address', type: 'string', label: 'Address' },
            { key: 'testing-two', type: 'string', label: 'Testing Two' },
          ] }
        ]}
      },

      { key: '', type: MiaField.TYPE_LABEL, label: '<h2>-- Position Field --</h2>', classes: 'label-custom' },
      { key: 'margin', type: MiaField.TYPE_CUSTOM, extra: { component: PositionFieldComponent } },
      { key: 'switch', type: MiaField.TYPE_CUSTOM, label: 'Display source code', extra: { component: SwitchFieldComponent } },
      { key: 'color_primary', type: MiaField.TYPE_CUSTOM, label: 'Color Primary', extra: { component: ColorSelectorFieldComponent, colors: ['#000', '#333', '#eee', '#ddd'] } },
      { key: 'slider_percent', type: MiaField.TYPE_CUSTOM, label: 'Test Percent', extra: { component: SliderFieldComponent } },
      { key: 'photos', type: MiaField.TYPE_CUSTOM, label: 'Photos', extra: { component: ImagesFieldComponent, limit: 5 } },
      { key: 'section_height', type: MiaField.TYPE_CUSTOM, label: 'Section Height', extra: { component: SizeRadioFieldComponent, key_custom: 'section_height_custom', class_name: 'section', default_value: 'section-large' } },
      { key: '', type: MiaField.TYPE_LABEL, label: '<h2>-- Google Maps --</h2>', classes: 'label-custom' },
      { key: 'address_google', type: MiaField.TYPE_CUSTOM, label: 'Address', extra: { key_latitude: 'latitude', key_longitude: 'longitude' } },
    ];
    this.config.errorMessages = [
      { key: 'required', message: 'The %label% is required.' }
    ];
  }

  onClickOpenForm() {
    let data = new MiaFormModalConfig();
    data.item = this.item;
    data.titleNew = 'Settings';
    data.titleEdit = 'Settings';
    data.showButtons = false;

    let config = new MiaFormConfig();
    config.hasSubmit = false;
    config.fields = [
      { key: 'firstname', type: 'string', label: 'Nombre' },
      { key: 'lastname', type: 'string', label: 'Apellido' },
    ];
    config.errorMessages = [
      { key: 'required', message: 'The "%label%" is required.' }
    ];

    data.config = config;

    return this.dialog.open(MiaFormModalComponent, {
      width: '500px',
      panelClass: 'modal-full-width-mobile',
      data: data
    }).afterClosed();
  }

  onClickOpenFormV2() {
    let data = new MiaFormModalV2Config();
    data.item = this.item;
    data.title = 'Settings V2';

    let config = new MiaFormConfig();
    config.hasSubmit = false;
    config.fields = [
      { key: 'firstname', type: 'string', label: 'Nombre' },
      { key: 'lastname', type: 'string', label: 'Apellido' },
    ];
    config.errorMessages = [
      { key: 'required', message: 'The "%label%" is required.' }
    ];

    data.config = config;

    let dialogRef = this.dialog.open(MiaFormModalV2Component, {
      width: '500px',
      panelClass: 'modal-full-width-mobile',
      data: data
    });
    dialogRef.componentInstance.processing.subscribe(item => {
      console.log(item);
      //alert('Procesando');
      dialogRef.componentInstance.setErrorMessage('Problema no resuelto');
      //dialogRef.close();
    });
  }

  onClickOpenFormV3() {
    let config = new MiaFormModalV3Config();
    config.item = this.item;
    config.title = 'Page Settings';
    config.tabs = [
      { title: 'General', fields: [
        { key: 'firstname', type: 'string', label: 'Nombre' },
        { key: 'lastname', type: 'string', label: 'Apellido' },
      ] },
      { title: 'SEO', fields: [
        { key: 'photo', type: MiaField.TYPE_PHOTO, label: 'Photo', caption: 'Foto del usuario.' },
      ] },
      { title: 'Advanced', fields: [
        { key: 'email', type: MiaField.TYPE_EMAIL, label: 'Email' },
      ] },
    ];

    this.formModals.openV3(config).subscribe(res => {
      console.log(res);
      res.modal.stopSending();
      res.modal.close();
    });
  }

  onClickOpenFormWizard() {
    let config = new MiaFormWizardConfig();
    config.item = this.item;
    config.title = 'Page Settings';
    config.tabs = [
      { title: 'General', fields: [
        { key: 'firstname', type: 'string', label: 'Nombre' },
        { key: 'lastname', type: 'string', label: 'Apellido' },
      ] },
      { title: 'SEO', fields: [
        { key: 'photo', type: MiaField.TYPE_PHOTO, label: 'Photo', caption: 'Foto del usuario.' },
      ] },
      { title: 'Advanced', fields: [
        { key: 'email', type: MiaField.TYPE_EMAIL, label: 'Email' },
      ] },
    ];

    this.formModals.openWizard(config).subscribe(res => {
      console.log(res);
      res.modal.stopSending();
      res.modal.close();
    });
  }

  onFilterCustom(ac: MiaFilterSelected) {

  }

  loadFilterBox() {
    this.queryFilter = new MiaQuery();

    this.filterBox = new MiaFilterBoxConfig();
    this.filterBox.filters = [
      { key: 'title', title: 'Title', type: MiaFilterType.TYPE_WRITE },
      { key: 'status', title: 'Status', value: 1, type: MiaFilterType.TYPE_OPTIONS, options: [
        { id: 0, title: 'State 1' },
        { id: 1, title: 'State 2' },
        { id: 2, title: 'State 3' },
      ] },
      { key: 'status', title: 'Status is closed', value: 1, type: MiaFilterType.TYPE_WITHOUT_OPTIONS },
      { key: 'deadline', title: 'Deadline', value: 0, type: MiaFilterType.TYPE_OPTIONS_CUSTOM, options: [
        { id: 0, title: 'Ultimo mes' },
        { id: 1, title: 'Ultima semana' },
        { id: 2, title: 'Ultimo año' },
        { id: 3, title: 'Ultimos 6 meses' },
      ] },
      { key: 'amount', title: 'Amount', value: 0, type: MiaFilterType.TYPE_OPTIONS_CUSTOM, options: [
        { id: 0, title: '15000USD o menos' },
        { id: 1, title: '15001USD a 30000USD' },
        { id: 2, title: '30001 a 50000USD' },
        { id: 3, title: '50000 a 100000USD' },
        { id: 4, title: '100.000+' },
      ] },
    ];
  }

  openModal(){
    let data = new MiaFormModalConfig(); data.item = data.service = this.contactService; data.titleNew = 'Create Contact'; data.titleEdit = 'Edit Contact';
    let config = new MiaFormConfig(); config.hasSubmit = false; config.fields = [
      { key: 'firstname', type: MiaField.TYPE_STRING, label: 'First name'
      },
      { key: 'email', type: MiaField.TYPE_STRING, label: 'Email', validators:
      [Validators.required] }, ];
      config.errorMessages = [
      { key: 'required', message: 'The "%label%" is required.' }
      ];
      data.config = config;
      return this.dialog.open(MiaFormModalComponent, {
      width: '520px',
      panelClass: 'modal-full-width-mobile', data: data
      }).afterClosed();
  }

}
function switchMap(arg0: (it: any) => any): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

