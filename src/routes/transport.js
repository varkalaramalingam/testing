import transportbuses from "../components/admin/transport/busses/transport_buses_template.vue";
import transportnewbus from "../components/admin/transport/busses/transport_newbus_template.vue";
import transportdashboard from "../components/admin/transport/dashboard/transport_dashboard_template.vue";
import transport from "../components/admin/transport/main/transport_template.vue";
import transportnewroute from "../components/admin/transport/routes/transport_newroute_template.vue";
import transportroutes from "../components/admin/transport/routes/transport_routes_template.vue";
import transportnewstaff from "../components/admin/transport/staff/transport_newstaff_template.vue";
import transportstaff from "../components/admin/transport/staff/transport_staff_template.vue";
import transportnewstop from "../components/admin/transport/stops/transport_newstop_template.vue";
import transportstops from "../components/admin/transport/stops/transport_stops_template.vue";
import busroutestransport from "../components/admin/transport/bus_routes/bus_routes_transport_template.vue"
import busnewroutestransport from "../components/admin/transport/bus_routes/bus_newroute_template.vue"
import getAssignedStudnetsFromBus from "../components/admin/transport/add_students_to_bus/get_assigned_students_from_buses.vue"
import addStudentsToBus from "../components/admin/transport/add_students_to_bus/add_students_to_bus.vue"
import getActiveBusDetails from "../components/admin/transport/activate_bus/get_active_bus_details.vue"
import activateBus from "../components/admin/transport/activate_bus/activate_bus.vue"

export default {
  path: "/transport",
  component: transport,
  children: [
    {
      path: "dashboard",
      component: transportdashboard
    },
    {
      path: "staff",
      component: transportstaff
    },
    {
      path: "staff/newstaff",
      component: transportnewstaff
    },
    {
      path: "stops",
      component: transportstops
    },
    {
      path: "stops/newstop",
      component: transportnewstop
    },
    {
      path: "buses",
      component: transportbuses
    },
    {
      path: "buses/newbus",
      component: transportnewbus
    },
    {
      path: "routes",
      component: transportroutes
    },
    {
      path: "routes/newroute",
      component: transportnewroute
    },{
      path:"busroutestransport",
      component:busroutestransport
    },{
      path:"busnewroutestransport",
      component:busnewroutestransport
    },{
      path:"getAssignedStudnetsFromBus",
      component:getAssignedStudnetsFromBus
    },{
      path:"addStudentsToBus",
      component:addStudentsToBus
    },{
      path:"getActiveBusDetails",
      component:getActiveBusDetails
    },{
      path:"activateBus",
      component:activateBus
    }
  ]
};
