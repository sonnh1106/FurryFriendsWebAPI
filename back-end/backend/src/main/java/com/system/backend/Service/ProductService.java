package com.system.backend.Service;

import com.system.backend.Dto.Product.ProductRequest;
import com.system.backend.Dto.Product.ProductResponse;
import com.system.backend.Entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    String insertProduct(String account, ProductRequest productRequest);
    String deleteProduct(String account, Integer product_id);
    String updateProduct(String account, Integer product_id, ProductRequest productRequest);
    List<ProductResponse> getAllProducts();
    List<ProductResponse> getProductsBySearch(String q);
    List<ProductResponse> getProducts(String account);
    ProductResponse getProductFromUser(String account, Integer product_id);
    ProductResponse getProduct(Integer product_id);
}

