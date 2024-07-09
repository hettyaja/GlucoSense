import { PermissionsAndroid, Platform, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import XLSX from 'xlsx';
import User from '../Entity/User';
import BusinessPartner from '../Entity/BusinessPartner';

class ExportReportController {
  static async getPermissions(setHasPermission, Alert) {
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    let storagePermission = { status: 'granted' };

    if (Platform.OS === 'android') {
      storagePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save the exported files.',
          buttonPositive: 'OK',
        }
      );
    }

    if (mediaLibraryPermission.status === 'granted' && storagePermission === PermissionsAndroid.RESULTS.GRANTED) {
      setHasPermission(true);
    } else {
      Alert.alert('Permission required', 'This app needs storage access to save the exported files.');
    }
  }

  static async handleExport({ format, data, startDate, endDate, hasPermission }) {
    if (!hasPermission) {
      throw new Error('Permission to access storage was denied.');
    }

    if (format === 'Microsoft Excel') {
      const dataToExport = await (data === 'Users' ? User.export() : BusinessPartner.export());
      if (dataToExport.length === 0) {
        throw new Error('No data available for export.');
      }

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      const excelFile = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

      try {
        const fileUri = `${FileSystem.documentDirectory}export.xlsx`;
        await FileSystem.writeAsStringAsync(fileUri, excelFile, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }

        Alert.alert('Export Successful', 'File saved to Downloads folder.');
      } catch (error) {
        throw new Error(`There was an error saving the file: ${error.message}`);
      }
    }
  }
}

export default ExportReportController;
