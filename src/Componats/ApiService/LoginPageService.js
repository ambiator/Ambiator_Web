/* eslint-disable max-len */
import ApplicationStore from '../Utility/localStorageUtil';

const successCaseCode = [200, 201];

const _fetchService = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
  const { accessToken, userDetails } = ApplicationStore().getStorage('userDetails');
  // const END_POINT = ' http://192.168.1.74:8004/api/';
  // const END_POINT = 'http://192.168.1.85:8004/api/';
  // const END_POINT = ' http://192.168.1.147:8004/api/';
  // const END_POINT = ' http://192.168.1.87:8005/api/';

  const END_POINT = 'http://13.127.40.80:8000/api/';

  const { email, emailId, userRole, afiliateCode, id } = userDetails;

  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${accessToken}`,
    accessToken: `${accessToken}`,
    afiliatecode: `${afiliateCode}`,
    userid: `${emailId}`,
    userRole: `${userRole}`,
    id: `${id}`,
    email: `${email}`,
    // accessToken: `${accessToken?.accessToken}`
  };


  // const body = (serviceMethod === 'GET') || (serviceMethod === 'DELETE') ? {} : { body: JSON.stringify(data) };

  const body = (serviceMethod === 'GET') ? {} : { body: JSON.stringify(data) };

  const bodyParameters = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers,
    ...body,
  };

  const bodyObject = {
    method: serviceMethod,
    ...bodyParameters,
  };

  return fetch(END_POINT + PATH, bodyObject)
    .then((response) => {
      if (successCaseCode.indexOf(response.status) > -1) {
        return response.json();
      }
      // eslint-disable-next-line no-throw-literal
      throw {
        errorStatus: response.status,
        errorObject: response.json(),
      };
    })
    .then((dataResponse) => successCallback(dataResponse))
    .catch((error) => {
      error.errorObject.then((errorResponse) => {
        if (error.errorStatus === 401 && errorResponse.message === 'Unable to access the page, Token Expired') {

          ApplicationStore().clearStorage();
          window.location.reload();
        }
        errorCallBack(error.errorStatus, errorResponse.message);
      });
    });
};


export const LoginService = (data) => {
  const PATH = 'loginWeb';
  const END_POINT = 'http://13.127.40.80:8000/api/';

  const SERVICE_METHOD = 'POST';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return fetch(END_POINT + PATH, {
    method: SERVICE_METHOD,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
};





export const InfoDeviceShow = (data, successCallback, errorCallBack) => _fetchService('infoDevice', 'POST', data, successCallback, errorCallBack);

export const InfoDeviceId = (data, successCallback, errorCallBack) => _fetchService('infoDevice/deviceList', 'POST', data, successCallback, errorCallBack);

export const InfoDeviceTemp = (data, successCallback, errorCallBack) => _fetchService('infoDevice/deviceTemperature', 'POST', data, successCallback, errorCallBack);

export const InfoDeviceStatus = (data, successCallback, errorCallBack) => _fetchService('infoDevice/deviceStatus', 'POST', data, successCallback, errorCallBack);

export const InfoDayTime = (data, successCallback, errorCallBack) => _fetchService('selfHeal/dayTimeShow', 'POST', data, successCallback, errorCallBack);

export const InfoShedule = (data, successCallback, errorCallBack) => _fetchService('schedule', 'POST', data, successCallback, errorCallBack);

export const ScheduleWebDevSchedList = (data, successCallback, errorCallBack) => _fetchService('schedule/WebDevSchedList', 'POST', data, successCallback, errorCallBack);

export const weekDaySchedular = (data, successCallback, errorCallBack) => _fetchService('schedule/weekDaySchedular', 'POST', data, successCallback, errorCallBack);

export const ScheduleDayScheduleState = (data, successCallback, errorCallBack) => _fetchService('schedule/dayScheduleState', 'POST', data, successCallback, errorCallBack);

export const InfoModeShedule = (data, successCallback, errorCallBack) => _fetchService('mode/showModeSettings', 'POST', data, successCallback, errorCallBack);

export const InStallerShedule = (data, successCallback, errorCallBack) => _fetchService('mode/instaOveSet', 'POST', data, successCallback, errorCallBack);

export const ModeHumadity = (data, successCallback, errorCallBack) => _fetchService('mode/setHumidity', 'POST', data, successCallback, errorCallBack);

export const StateAutomode = (data, successCallback, errorCallBack) => _fetchService('mode/autoMode', 'POST', data, successCallback, errorCallBack);

export const StateHumadity = (data, successCallback, errorCallBack) => _fetchService('mode/setHumidity', 'POST', data, successCallback, errorCallBack);

export const StateFan = (data, successCallback, errorCallBack) => _fetchService('mode/setFanSpeed', 'POST', data, successCallback, errorCallBack);

export const UserSheduleState = (data, successCallback, errorCallBack) => _fetchService('schedule/schedulerUseState', 'POST', data, successCallback, errorCallBack);

export const SelfHealState = (data, successCallback, errorCallBack) => _fetchService('selfHeal', 'POST', data, successCallback, errorCallBack);

export const DayHealShow = (data, successCallback, errorCallBack) => _fetchService('selfHeal/dayTimeShow', 'POST', data, successCallback, errorCallBack);

export const DeviceAddService = (data, successCallback, errorCallBack) => _fetchService('device', 'POST', data, successCallback, errorCallBack);

export const DeviceTypeShow = (successCallback, errorCallBack) => _fetchService('deviceType/deviceTypeShow', 'GET', {}, successCallback, errorCallBack);

export const DeviceAsssigned = (successCallback, errorCallBack) => _fetchService('AssignDevice/showNotAssignedDev', 'GET', {}, successCallback, errorCallBack);

export const AsssignedCustomer = (successCallback, errorCallBack) => _fetchService('AssignDevice/costumerDropDownList', 'GET', {}, successCallback, errorCallBack);

export const AssignedDevice = (data, successCallback, errorCallBack) => _fetchService('AssignDevice', 'POST', data, successCallback, errorCallBack);

export const ChangePassword = (data, successCallback, errorCallBack) => _fetchService('user/resetPassword', 'POST', data, successCallback, errorCallBack);

export const ChangeSetPoint = (data, successCallback, errorCallBack) => _fetchService('machine/setPoint', 'POST', data, successCallback, errorCallBack);

export const OtaUpgradeService = (data, successCallback, errorCallBack) => _fetchService('otaUpgrade', 'POST', data, successCallback, errorCallBack);

export const Changemachine = (data, successCallback, errorCallBack) => _fetchService('machine', 'POST', data, successCallback, errorCallBack);

export const ShowUserList = (successCallback, errorCallBack) => _fetchService('user', 'GET', {}, successCallback, errorCallBack);

export const WIFIUpgradeService = (data, successCallback, errorCallBack) => _fetchService('WifiUpdate', 'POST', data, successCallback, errorCallBack);

export const DeviceEditService = (data, successCallback, errorCallBack) => _fetchService(`device/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const DeviceDeleteService = (data, successCallback, errorCallBack) => _fetchService(`device/${data.id}`, 'DELETE', data, successCallback, errorCallBack);

export const GraphData = (data, successCallback, errorCallBack) => _fetchService('chart/energyConsumption', 'POST', data, successCallback, errorCallBack);

export const WaterGarphData = (data, successCallback, errorCallBack) => _fetchService('chart/waterConsumption', 'POST', data, successCallback, errorCallBack);

export const OutSideVsSupTemp = (data, successCallback, errorCallBack) => _fetchService('chart/outSideVsSupTemp', 'POST', data, successCallback, errorCallBack);

////////GHGE Factor////////
export const GHGenergyShowService = (successCallback, errorCallBack) => _fetchService('EnergyGhg/showData', 'GET', {}, successCallback, errorCallBack);

export const GHGenergyAddService = (data, successCallback, errorCallBack) => _fetchService('EnergyGhg', 'POST', data, successCallback, errorCallBack);

export const GHGenergyAEditService = (data, successCallback, errorCallBack) => _fetchService(`EnergyGhg/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const GHGenergyADeviceService = (data, successCallback, errorCallBack) => _fetchService(`EnergyGhg/${data.id}`, 'DELETE', data, successCallback, errorCallBack);

/////Device Type//////
export const DeviceTypeShowData = (successCallback, errorCallBack) => _fetchService('deviceType/showData', 'GET', {}, successCallback, errorCallBack);

export const DeviceAddType = (data, successCallback, errorCallBack) => _fetchService('deviceType', 'POST', data, successCallback, errorCallBack);

export const DeviceEditType = (data, successCallback, errorCallBack) => _fetchService(`deviceType/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const DeviceDeleteType = (data, successCallback, errorCallBack) => _fetchService(`deviceType/${data.id}`, 'DELETE', data, successCallback, errorCallBack);

///////Device////
export const DeviceShowData = (successCallback, errorCallBack) => _fetchService('device', 'GET', {}, successCallback, errorCallBack);

////Customer/////
export const CustomerShowData = (successCallback, errorCallBack) => _fetchService('customer', 'GET', {}, successCallback, errorCallBack);

//////User////
export const UserAllShowData = (successCallback, errorCallBack) => _fetchService('user/showAll', 'GET', {}, successCallback, errorCallBack);

export const UserAddService = (data, successCallback, errorCallBack) => _fetchService('user', 'POST', data, successCallback, errorCallBack);

export const UserEditService = (data, successCallback, errorCallBack) => _fetchService(`user/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const UserDeleteService = (data, successCallback, errorCallBack) => _fetchService(`user/${data.id}`, 'DELETE', data, successCallback, errorCallBack);

//////Device Statistics////

export const DeviceStatisticsService = (data, successCallback, errorCallBack) => _fetchService('chart/getStatistics', 'POST', data, successCallback, errorCallBack);

///// Device Active /////

export const ActiveShowData = (data, successCallback, errorCallBack) => _fetchService('infoDevice/activeInfo', 'POST', data, successCallback, errorCallBack);

export const AlertShowData = (data, successCallback, errorCallBack) => _fetchService('infoDevice/alertInfo', 'POST', data, successCallback, errorCallBack);

///// sTREET MAP ///////

export const AlertMapPinData = (data, successCallback, errorCallBack) => _fetchService('infoDevice/alertMapInfo', 'POST', data, successCallback, errorCallBack);

export const ChallengeShowData = (data, successCallback, errorCallBack) => _fetchService('challenge/showData', 'POST', data, successCallback, errorCallBack);

export const DeviceWifiUpdate = (data, successCallback, errorCallBack) => _fetchService(`WifiUpdate/`, 'PUT', data, successCallback, errorCallBack);

export const EnergyGraphShowData = (data, successCallback, errorCallBack) => _fetchService('infoDevice/EnergyConsumption', 'POST', data, successCallback, errorCallBack);

////////CASS Api//////

export const affiliateCASS = (data, successCallback, errorCallBack) => _fetchService('caas/checkPassword', 'POST', data, successCallback, errorCallBack);

export const CASSAffliateControl = (data, successCallback, errorCallBack) => _fetchService('caas/CaasControl', 'POST', data, successCallback, errorCallBack);

///////GHGE Factor////////
export const RpmenergyShowService = (successCallback, errorCallBack) => _fetchService('rpmValue/RpmValueShow', 'GET', {}, successCallback, errorCallBack);

export const RpmenergyAddService = (data, successCallback, errorCallBack) => _fetchService('rpmValue', 'POST', data, successCallback, errorCallBack);

export const RpmenergyAEditService = (data, successCallback, errorCallBack) => _fetchService(`rpmValue/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const RpmenergyADeleteService = (data, successCallback, errorCallBack) => _fetchService(`rpmValue/${data.id}`, 'DELETE', data, successCallback, errorCallBack);