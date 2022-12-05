export class APIConstant {
  private static readonly BASE_URL = 'https://test.airlines.api.amadeus.com/v2';

  public static readonly AIR_BOUND_URL =
    APIConstant.BASE_URL + '/search/air-bounds';

  public static readonly AIR_CALENDER_URL =
    APIConstant.BASE_URL + '/search/air-calendars';

  public static readonly FLIGHT_DETAILS_URL =
    APIConstant.BASE_URL + '/search/flight-details';

  public static readonly FLIGHT_DETAILS_BY_ORDER_URL =
    APIConstant.BASE_URL + '/search/flight-details/by-order';
}
