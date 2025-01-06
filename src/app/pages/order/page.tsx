"use client";

import React from "react";
import ContentPage from "@/app/components/contentPage";
import { DataGridPremium, GridToolbar } from "@mui/x-data-grid-premium";
import {
  Button,
  Form,
  Input,
  Modal,
  Tag,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import { FaCartArrowDown } from "react-icons/fa6";
import dayjs from "dayjs";

type PesananLaundry = {
  noOrder: string; // Nomor pesanan unik
  namaPelanggan: string; // Nama pelanggan
  nomerHp: string; // Nomor HP pelanggan
  kategoriItem: string; // Jenis pakaian atau barang yang dicuci
  jumlahItem: number; // Jumlah barang yang dicuci
  tanggalMasuk: Date; // Tanggal barang diterima
  tanggalSelesai: Date; // Tanggal perkiraan selesai
  jenisCuci: string; // Jenis layanan cuci (misalnya: cuci kering, cuci basah)
  statusPembayaran: string; // Status pembayaran
  totalBiaya: number; // Biaya sebelum diskon
  diskon: number; // Potongan harga (diskon)
  totalBiayaSetelahDiskon: number; // Biaya setelah diskon
  catatan: string; // Catatan tambahan
  statusLaundry: string; // Status laundry (misalnya: diterima, dalam proses)
  tipePengerjaan: string; // Jenis pengerjaan (biasa atau cepat)
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [form] = Form.useForm();

  // Watch the values in real time
  const totalBiaya = Form.useWatch("totalBiaya", form) || 0;
  const diskon = Form.useWatch("diskon", form) || 0;

  // Calculate total cost after discount
  const totalBiayaSetelahDiskon = totalBiaya - (totalBiaya * diskon) / 100;
  React.useEffect(() => {
    let isMounted = true;
    if (isModalOpen && isMounted) {
      form.setFieldsValue({ totalBiayaSetelahDiskon });
    }
    return () => {
      isMounted = false;
    };
  }, [form, isModalOpen, totalBiayaSetelahDiskon]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <ContentPage>
      <div className="flex my-2">
        <Button type="primary" icon={<FaCartArrowDown />} onClick={showModal}>
          Orderan Baru
        </Button>
      </div>

      <Modal
        title="Order Detail"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        centered
        className="!w-[80vw]"
      >
        <Form
          form={form}
          name="basic"
          variant="filled"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            diskon: 0,
            totalBiayaSetelahDiskon: 0,
            totalBiaya: 0,
          }}
        >
          <div className="grid grid-cols-4 grid-rows-4 gap-4 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
            <Form.Item<PesananLaundry> label="No. Order" name="noOrder">
              <Input />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Nama Pelanggan"
              name="namaPelanggan"
              rules={[
                { required: true, message: "Harap masukan nama!" },
                { max: 100, message: "Maksimal 100 karakter!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="No. Hp"
              name="nomerHp"
              rules={[
                { required: true, message: "Harap masukan no hp!" },
                {
                  pattern: /^62\d{9,13}$/,
                  message: "Harap masukan no hp yang valid!",
                },
              ]}
            >
              <Input placeholder="62xxxxxxxxx" maxLength={15} />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Katergori Item"
              name="kategoriItem"
              rules={[{ required: true, message: "Harap masukan kategori!" }]}
            >
              <Select
                options={[{ value: "sample", label: <span>sample</span> }]}
              />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Jumlah Item"
              name="jumlahItem"
              rules={[{ required: true, message: "Harap masukan jumlah!" }]}
            >
              <InputNumber className="w-full" min={1} />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Tanggal Masuk"
              name="tanggalMasuk"
              rules={[{ required: true, message: "Harap masukan tanggal!" }]}
            >
              <DatePicker
                className="w-full"
                disabledDate={(date) => date < dayjs().subtract(1, "day")}
              />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Tanggal Selesai"
              name="tanggalSelesai"
              rules={[{ required: true, message: "Harap masukan tanggal!" }]}
            >
              <DatePicker
                className="w-full"
                disabledDate={(date) => date < dayjs().subtract(1, "day")}
              />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Jenis Cuci"
              name="jenisCuci"
              rules={[{ required: true, message: "Harap masukan jenis cuci!" }]}
            >
              <Select
                options={[{ value: "sample", label: <span>sample</span> }]}
              />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Status Pembayaran"
              name="statusPembayaran"
              rules={[{ required: true, message: "Harap masukan status!" }]}
            >
              <Select
                options={[{ value: "sample", label: <span>sample</span> }]}
              />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Total Biaya"
              name="totalBiaya"
              rules={[
                { required: true, message: "Harap masukan total biaya!" },
              ]}
            >
              <InputNumber
                className="w-full"
                min={0}
                prefix="Rp"
                suffix=",-"
                step={100}
              />
            </Form.Item>
            <Form.Item<PesananLaundry> label="Diskon" name="diskon">
              <InputNumber
                className="w-full"
                min={0}
                max={100}
                maxLength={3}
                suffix="%"
                step={1}
              />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Total Biaya setelah diskon"
              name="totalBiayaSetelahDiskon"
            >
              <InputNumber
                className="w-full"
                min={0}
                prefix="Rp"
                suffix=",-"
                step={100}
                readOnly
              />
            </Form.Item>

            <Form.Item<PesananLaundry>
              label="Catatan"
              name="catatan"
              rules={[{ max: 255, message: "Maksimal 255 karakter!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<PesananLaundry>
              label="Status Laundry"
              name="statusLaundry"
              rules={[{ required: true, message: "Harap masukan status!" }]}
            >
              <Select
                options={[{ value: "sample", label: <span>sample</span> }]}
              />
            </Form.Item>
            <Form.Item<PesananLaundry>
              label="Tipe Pengerjaan"
              name="tipePengerjaan"
              rules={[{ required: true, message: "Harap masukan tipe!" }]}
            >
              <Select
                options={[{ value: "sample", label: <span>sample</span> }]}
              />
            </Form.Item>
          </div>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="h-max-[400px]">
        <DataGridPremium
          rows={[
            {
              id: "2e920cb3-96b1-4d04-b972-ddbbd1a82566",
              noOrder: `ORD-123124124214`,
              namaPelanggan: "Andi",
              nomerHp: "08123456789",
              kategoriItem: "Pakaian, lainnya",
              jumlahItem: 5,
              tanggalMasuk: new Date(),
              tanggalSelesai: new Date(),
              jenisCuci: "Cuci Kering",
              statusPembayaran: "Lunas",
              totalBiaya: 50000,
              dikon: 0,
              totalBiayaSetelahDiskon: 50000,
              catatan: "-",
              statusLaundry: "Diterima",
              tipPengerjaan: "Express",
              createdAt: new Date(),
              updatedAt: new Date(),
              createdBy: "Noni",
              updatedBy: "Arif",
            },
          ]}
          columns={[
            {
              field: "statusLaundry",
              headerName: "Status Order",
              headerAlign: "center",
              align: "center",
              editable: true,
              minWidth: 150,
              type: "singleSelect",
              renderCell: (params) => <Tag color="default">{params.value}</Tag>,
              valueOptions: [
                "Diterima",
                "Belum Diproses",
                "Dalam Antrian",
                "Pending",
                "Selesai",
              ],
            },
            {
              field: "statusPembayaran",
              headerName: "Status Pembayaran",
              headerAlign: "center",
              align: "center",
              editable: true,
              minWidth: 150,
              type: "singleSelect",
              renderCell: (params) => (
                <Tag color={params.value === "Lunas" ? "green" : "red"}>
                  {params.value}
                </Tag>
              ),
              valueOptions: ["Lunas", "Belum Lunas"],
            },
            {
              field: "noOrder",
              headerName: "No Order",
              headerAlign: "center",
              align: "center",
              minWidth: 250,
            },
            {
              field: "namaPelanggan",
              headerName: "Nama Pelanggan",
              headerAlign: "center",
            },
            {
              field: "nomerHp",
              headerName: "Nomer Hp",
              headerAlign: "center",
            },
            {
              field: "kategoriItem",
              headerName: "Kategori Item",
              headerAlign: "center",
            },
            {
              field: "jumlahItem",
              headerName: "Jumlah Item",
              headerAlign: "center",
            },
            {
              field: "tanggalMasuk",
              headerName: "Tanggal Masuk",
              headerAlign: "center",
              type: "date",
            },
            {
              field: "tanggalSelesai",
              headerName: "Tanggal Selesai",
              headerAlign: "center",
              type: "date",
            },
            {
              field: "jenisCuci",
              headerName: "Jenis Cuci",
              headerAlign: "center",
            },

            {
              field: "totalBiaya",
              headerName: "Total Biaya",
              headerAlign: "center",
              type: "number",
            },
            {
              field: "dikon",
              headerName: "Dikon",
              headerAlign: "center",
              type: "number",
            },
            {
              field: "totalBiayaSetelahDiskon",
              headerName: "Total Biaya Setelah Diskon",
              headerAlign: "center",
              type: "number",
            },
            {
              field: "catatan",
              headerName: "Catatan",
              headerAlign: "center",
            },

            {
              field: "tipPengerjaan",
              headerName: "Tip Pengerjaan",
              headerAlign: "center",
            },
            {
              field: "createdAt",
              headerName: "Created At",
              headerAlign: "center",
              type: "dateTime",
            },
            {
              field: "updatedAt",
              headerName: "Updated At",
              headerAlign: "center",
              type: "dateTime",
            },
            {
              field: "createdBy",
              headerName: "Created By",
              headerAlign: "center",
            },
            {
              field: "updatedBy",
              headerName: "Updated By",
              headerAlign: "center",
            },
          ]}
          rowHeight={38}
          disableRowSelectionOnClick
          pagination
          pageSizeOptions={[10, 50, 100, 500, 1000]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            pinnedColumns: {
              left: ["noOrder"],
              right: ["statusLaundry", "statusPembayaran"],
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
    </ContentPage>
  );
}
